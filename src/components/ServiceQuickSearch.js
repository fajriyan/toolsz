"use client";

import Link from "next/link";
import { menuService } from "@/data/menuService";
import { useEffect, useRef, useState } from "react";

const topServices = menuService.filter((item) => item.top === 1);

const pickRandomServices = (services, count) => {
  const shuffled = [...services].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const normalizeText = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const levenshteinDistance = (a, b) => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const prev = Array.from({ length: b.length + 1 }, (_, index) => index);

  for (let i = 1; i <= a.length; i += 1) {
    const curr = [i];

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }

    for (let j = 0; j <= b.length; j += 1) {
      prev[j] = curr[j];
    }
  }

  return prev[b.length];
};

const isSubsequence = (needle, haystack) => {
  let index = 0;

  for (const char of haystack) {
    if (char === needle[index]) {
      index += 1;
      if (index === needle.length) return true;
    }
  }

  return needle.length === 0;
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getSearchTerms = (service) => {
  const keywordTerms = (service.keywords || []).map(normalizeText);
  const textTerms = normalizeText(service.text).split(" ").filter(Boolean);
  const descriptionTerms = normalizeText(service.description)
    .split(" ")
    .filter(Boolean);

  return [...keywordTerms, ...textTerms, ...descriptionTerms].filter(Boolean);
};

const getBestMatchedToken = (service, query) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return "";

  const keywordTerms = (service.keywords || [])
    .map(normalizeText)
    .filter(Boolean);
  const textTerms = normalizeText(service.text).split(" ").filter(Boolean);
  const searchableTerms = [...keywordTerms, ...textTerms];

  const exactKeyword = keywordTerms.find((term) => term === normalizedQuery);
  if (exactKeyword) return exactKeyword;

  const exactTextMatch = textTerms.find((term) => term === normalizedQuery);
  if (exactTextMatch) return exactTextMatch;

  const includedKeyword = searchableTerms.find(
    (term) => term.includes(normalizedQuery) || normalizedQuery.includes(term),
  );
  if (includedKeyword) return includedKeyword;

  if (normalizedQuery.length < 4) return "";

  let bestToken = "";
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const token of getSearchTerms(service)) {
    const distance = levenshteinDistance(normalizedQuery, token);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestToken = token;
    }
  }

  return bestDistance <= 2 ? bestToken : "";
};

const highlightText = (text, query, fallbackToken = "") => {
  const normalizedQuery = normalizeText(query);
  const source = String(text);

  if (!normalizedQuery) return source;

  const exactPattern = new RegExp(`(${escapeRegExp(query)})`, "ig");
  if (source.toLowerCase().includes(query.toLowerCase())) {
    const parts = source.split(exactPattern);
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={`${part}-${index}`}
          className="rounded bg-cyan-100 px-1 text-cyan-900"
        >
          {part}
        </mark>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      ),
    );
  }

  if (
    fallbackToken &&
    source.toLowerCase().includes(fallbackToken.toLowerCase())
  ) {
    const tokenPattern = new RegExp(`(${escapeRegExp(fallbackToken)})`, "ig");
    const parts = source.split(tokenPattern);

    return parts.map((part, index) =>
      part.toLowerCase() === fallbackToken.toLowerCase() ? (
        <mark
          key={`${part}-${index}`}
          className="rounded bg-cyan-100 px-1 text-cyan-900"
        >
          {part}
        </mark>
      ) : (
        <span key={`${part}-${index}`}>{part}</span>
      ),
    );
  }

  return source;
};

const scoreServiceMatch = (service, query) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 0;

  const keywordTerms = (service.keywords || [])
    .map(normalizeText)
    .filter(Boolean);
  const textTerms = normalizeText(service.text).split(" ").filter(Boolean);
  const searchableTerms = [...keywordTerms, ...textTerms];
  const fullSearchable = normalizeText(
    [service.text, service.description, ...(service.keywords || [])].join(" "),
  );

  if (keywordTerms.some((term) => term === normalizedQuery)) {
    return 100;
  }

  if (fullSearchable.includes(normalizedQuery)) {
    return 98;
  }

  let bestScore = 0;

  for (const token of searchableTerms) {
    const distance = levenshteinDistance(normalizedQuery, token);
    const tokenLength = token.length;
    const queryLength = normalizedQuery.length;

    if (distance === 0) return 100;
    if (distance <= 1 && queryLength >= 4) bestScore = Math.max(bestScore, 95);
    else if (distance <= 2 && queryLength >= 5)
      bestScore = Math.max(bestScore, 88);

    if (
      queryLength >= 4 &&
      (isSubsequence(normalizedQuery, token) ||
        isSubsequence(token, normalizedQuery))
    ) {
      bestScore = Math.max(bestScore, tokenLength <= 8 ? 84 : 78);
    }
  }

  return bestScore;
};

export default function ServiceQuickSearch() {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);
  const [randomSuggestions, setRandomSuggestions] = useState(() =>
    menuService.slice(0, 10),
  );

  useEffect(() => {
    setRandomSuggestions(pickRandomServices(menuService, 10));
  }, []);

  const filteredServices = menuService.filter((service) => {
    return scoreServiceMatch(service, query) > 0;
  });

  const rankedSearchResults = [...filteredServices]
    .sort((a, b) => {
      const scoreA = scoreServiceMatch(a, query);
      const scoreB = scoreServiceMatch(b, query);

      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }

      if (a.top !== b.top) {
        return b.top - a.top;
      }

      return a.text.localeCompare(b.text);
    })
    .slice(0, 10);

  const displayedServices = query.trim()
    ? rankedSearchResults
    : randomSuggestions;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topServices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [topServices.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      const isShortcut =
        (isMac && event.metaKey && event.key.toLowerCase() === "k") ||
        (!isMac && event.ctrlKey && event.key.toLowerCase() === "k");

      if (!isShortcut) return;

      event.preventDefault();
      searchInputRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const rotatedSuggestions = [
    ...topServices.slice(activeIndex),
    ...topServices.slice(0, activeIndex),
  ];

  return (
    <section className="container mx-auto px-5 md:px-0 py-12 md:py-16">
      <div className="rounded-3xl border border-slate-200 bg-white/80 overflow-hidden">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] p-4 md:p-8">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
              Quick Search
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Cari layanan yang kamu butuhkan
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-6">
                Ketik nama layanan, kata kunci, atau kategori untuk menemukan
                tool dengan lebih cepat. Kami juga menampilkan suggestion
                layanan populer di bawah ini.
              </p>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="service-search"
                className="text-sm font-medium text-slate-700"
              >
                Search layanan
              </label>
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m21 21-4.3-4.3m1.8-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  id="service-search"
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Contoh: json, cron, password, seo..."
                  className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["json", "seo", "cron", "text", "password"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setQuery(item)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-800"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Suggestion layanan
              </h3>
              <span className="text-xs text-slate-500">
                {displayedServices.length} hasil
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {displayedServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-cyan-500 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-900 group-hover:text-cyan-700">
                        {highlightText(
                          service.text,
                          query,
                          getBestMatchedToken(service, query),
                        )}
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-slate-600 xl:line-clamp-1">
                        {highlightText(
                          service.description,
                          query,
                          getBestMatchedToken(service, query),
                        )}
                      </p>
                    </div>
                    <svg
                      className="mt-1 h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-cyan-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {query.trim() && filteredServices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
                Tidak ada layanan yang cocok. Coba kata kunci lain seperti
                <span className="font-medium text-slate-900"> json</span>,
                <span className="font-medium text-slate-900"> seo</span>, atau
                <span className="font-medium text-slate-900"> password</span>.
              </div>
            ) : null}
          </div>
        </div>

        <div className="border-t border-slate-200 bg-gray-100 p-4 md:px-4">
          <div className="flex overflow-x-auto hidescroll md:flex-wrap items-center gap-2 text-sm text-slate-600">
            {rotatedSuggestions.map((suggestion, index) => (
              <button
                key={suggestion.href}
                type="button"
                onClick={() => setQuery(suggestion.text)}
                className="rounded-full min-w-max bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200 transition hover:ring-cyan-400 hover:text-cyan-700"
              >
                #{index + 1} {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

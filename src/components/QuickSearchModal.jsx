"use client";

import Link from "next/link";
import { menuService } from "@/data/menuService";
import { useEffect, useRef, useState } from "react";
import { useSearchModal } from "@/contexts/SearchModalContext";

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
      (term) =>
         term.includes(normalizedQuery) || normalizedQuery.includes(term),
   );
   if (includedKeyword) return includedKeyword;

   if (normalizedQuery.length < 4) return "";

   let bestToken = "";
   let bestDistance = Number.POSITIVE_INFINITY;

   for (const token of [...keywordTerms, ...textTerms]) {
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
               className="rounded bg-cyan-100 px-0.5 text-cyan-900"
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
               className="rounded bg-cyan-100 px-0.5 text-cyan-900"
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
      [service.text, service.description, ...(service.keywords || [])].join(
         " ",
      ),
   );

   if (keywordTerms.some((term) => term === normalizedQuery)) return 100;
   if (fullSearchable.includes(normalizedQuery)) return 98;

   let bestScore = 0;

   for (const token of searchableTerms) {
      const distance = levenshteinDistance(normalizedQuery, token);
      const queryLength = normalizedQuery.length;

      if (distance === 0) return 100;
      if (distance <= 1 && queryLength >= 4)
         bestScore = Math.max(bestScore, 95);
      else if (distance <= 2 && queryLength >= 5)
         bestScore = Math.max(bestScore, 88);

      if (
         queryLength >= 4 &&
         (isSubsequence(normalizedQuery, token) ||
            isSubsequence(token, normalizedQuery))
      ) {
         bestScore = Math.max(bestScore, token.length <= 8 ? 84 : 78);
      }
   }

   return bestScore;
};

const pickRandomServices = (services, count) => {
   const shuffled = [...services].sort(() => Math.random() - 0.5);
   return shuffled.slice(0, count);
};

export default function QuickSearchModal() {
   const { isOpen, closeModal } = useSearchModal();
   const [query, setQuery] = useState("");
   const [activeIndex, setActiveIndex] = useState(0);
   const [shouldRender, setShouldRender] = useState(false);
   const [isAnimating, setIsAnimating] = useState(false);
   const inputRef = useRef(null);
   const backdropRef = useRef(null);

   const [randomSuggestions] = useState(() =>
      pickRandomServices(menuService, 6),
   );

   const filteredServices = menuService.filter(
      (service) => scoreServiceMatch(service, query) > 0,
   );

   const rankedSearchResults = [...filteredServices]
      .sort((a, b) => {
         const scoreA = scoreServiceMatch(a, query);
         const scoreB = scoreServiceMatch(b, query);
         if (scoreA !== scoreB) return scoreB - scoreA;
         if (a.top !== b.top) return b.top - a.top;
         return a.text.localeCompare(b.text);
      })
      .slice(0, 8);

   const displayedServices = query.trim()
      ? rankedSearchResults
      : randomSuggestions;

   useEffect(() => {
      if (isOpen) {
         setShouldRender(true);
         requestAnimationFrame(() => {
            requestAnimationFrame(() => {
               setIsAnimating(true);
            });
         });
         setQuery("");
         setActiveIndex(0);
         setTimeout(() => inputRef.current?.focus(), 150);
      } else if (shouldRender) {
         setIsAnimating(false);
         const timer = setTimeout(() => setShouldRender(false), 200);
         return () => clearTimeout(timer);
      }
   }, [isOpen]);

   useEffect(() => {
      setActiveIndex(0);
   }, [query]);

   useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e) => {
         if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => (prev + 1) % displayedServices.length);
         } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(
               (prev) =>
                  (prev - 1 + displayedServices.length) %
                  displayedServices.length,
            );
         } else if (e.key === "Enter" && displayedServices[activeIndex]) {
            window.location.href = displayedServices[activeIndex].href;
         }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [isOpen, displayedServices, activeIndex]);

   const handleBackdropClick = (e) => {
      if (e.target === backdropRef.current) {
         closeModal();
      }
   };

   if (!shouldRender) return null;

   const isMac =
      typeof navigator !== "undefined" &&
      navigator.platform.toUpperCase().includes("MAC");
   const shortcutKey = isMac ? "⌘" : "Ctrl";

   return (
      <div
         ref={backdropRef}
         onClick={handleBackdropClick}
         className={`fixed inset-0 z-[9999] flex items-start justify-center bg-black/50 pt-[15vh] px-4 transition-opacity duration-200 ease-out ${
            isAnimating ? "opacity-100" : "opacity-0"
         }`}
      >
         <div
            className={`w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ease-out ${
               isAnimating
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-2 scale-[0.98]"
            }`}
         >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
               <svg
                  className="h-5 w-5 shrink-0 text-slate-400"
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
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari tools"
                  className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
               />
               <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                  ESC
               </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto p-2">
               {query.trim() && filteredServices.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-slate-500">
                     Tidak ada hasil untuk{" "}
                     <span className="font-medium text-slate-900">
                        &quot;{query}&quot;
                     </span>
                  </div>
               ) : (
                  <>
                     <div className="px-3 py-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                           {query.trim() ? "Hasil pencarian" : "Tools populer"}
                        </span>
                     </div>
                     {displayedServices.map((service, index) => {
                        const Icon = service.icon;
                        return (
                           <Link
                              key={service.href}
                              href={service.href}
                              onClick={closeModal}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                                 index === activeIndex
                                    ? "bg-gray-200 text-cyan-900"
                                    : "text-slate-700 hover:bg-slate-50"
                              }`}
                           >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                 {Icon && (
                                    <Icon className="h-4 w-4 text-slate-500" />
                                 )}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <div className="font-semibold truncate text-cyan-900">
                                    {highlightText(
                                       service.text,
                                       query,
                                       getBestMatchedToken(service, query),
                                    )}
                                 </div>
                                 <div className="text-xs text-slate-700 truncate">
                                    {service.description}
                                 </div>
                              </div>
                              <svg
                                 className="h-4 w-4 shrink-0 text-slate-600"
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
                           </Link>
                        );
                     })}
                  </>
               )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-[11px] text-slate-500">
               <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                     <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono">
                        ↑
                     </kbd>
                     <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono">
                        ↓
                     </kbd>
                     navigasi
                  </span>
                  <span className="flex items-center gap-1">
                     <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono">
                        ↵
                     </kbd>
                     buka
                  </span>
               </div>
               <span className="flex items-center gap-1">
                  <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono">
                     {shortcutKey}
                  </kbd>
                  <kbd className="rounded border border-slate-200 bg-white px-1 py-0.5 font-mono">
                     K
                  </kbd>
                  toggle
               </span>
            </div>
         </div>
      </div>
   );
}

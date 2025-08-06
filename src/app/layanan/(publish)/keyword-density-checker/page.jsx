"use client";

import { useState } from "react";

export default function KeywordCheckerPage() {
  const [url, setUrl] = useState("");
  const [lang, setLang] = useState("id");
  const [ngram, setNgram] = useState(1); // pilihan ngram di frontend
  const [topKeywords, setTopKeywords] = useState({});
  const [allNgrams, setAllNgrams] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchKeywords = async () => {
    setLoading(true);
    setError("");
    setTopKeywords({});
    setAllNgrams({});

    try {
      const res = await fetch("/layanan/keyword-density-checker/api", {
        method: "POST",
        body: JSON.stringify({ url, lang }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memuat data");

      setTopKeywords(data.topKeywords || {});
      setAllNgrams(data.allNgrams || {});
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const displayedNgrams = allNgrams[ngram] || [];

  const exportToCSV = () => {
    if (!allNgrams || Object.keys(allNgrams).length === 0) return;

    const langLabel = {
      id: "Bahasa Indonesia",
      en: "English",
    };

    const ngramLabel = {
      1: "Satu Kata",
      2: "Dua Kata",
      3: "Tiga Kata",
      4: "Empat Kata",
    };

    let csvLines = [
      `URL,"${url}"`,
      `Bahasa,"${langLabel[lang]}"`,
      `Jenis Keyword,"${ngramLabel[ngram]}"`,
      "",
      "Keyword,Jumlah,% Frekuensi",
    ];

    displayedNgrams.forEach(({ word, count, percentage }) => {
      csvLines.push(`"${word}",${count},${percentage}`);
    });

    const csvContent = csvLines.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const urlBlob = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlBlob;
    link.download = `keyword-analysis-${ngramLabel[ngram]
      .toLowerCase()
      .replace(" ", "-")}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="container mx-auto min-h-[84vh] pb-20 px-3 lg:px-0">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            Keyword Density Checker | SEO Tools
          </h1>
          <p className="text-center text-xs">
            Cek keyword dencity pada konten kamu dengan mudah dan cepat.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-7 mt-8">
          <div className="md:w-[30%]">
            <input
              type="text"
              placeholder="Masukkan URL halaman"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 focus-within:outline-none focus:border-cyan-700 border border-gray-300 rounded mb-4"
            />

            <div className="flex flex-col md:flex-row gap-5">
              <select
                className="w-full px-3 py-2 focus-within:outline-none focus:border-cyan-700 border border-gray-300 rounded mb-4"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>

              <select
                className="w-full px-3 py-2 focus-within:outline-none focus:border-cyan-700 border border-gray-300 rounded mb-4"
                value={ngram}
                onChange={(e) => setNgram(Number(e.target.value))}
              >
                <option value={1}>Keywords (Satu kata)</option>
                <option value={2}>Keywords (Dua kata)</option>
                <option value={3}>Keywords (Tiga kata)</option>
                <option value={4}>Keywords (Empat kata)</option>
              </select>
            </div>

            <button
              onClick={fetchKeywords}
              disabled={loading || !url}
              className="block bg-gradient-to-r from-gray-800 to-slate-900 hover:ring-2 ring-cyan-500 font-medium text-white px-3 py-[7px] w-full text-center cursor-pointer rounded-lg"
            >
              {loading ? "Memuat..." : "Analisis Keyword"}
            </button>

            <div className="mt-3">
              {error && (
                <p className="text-red-600 text-center mb-4 text-sm">{error}</p>
              )}

              {Object.keys(topKeywords).length > 0 && (
                <>
                  <div className="mb-5 max-w-xl mx-auto p-4 border rounded bg-gray-50">
                    <h2 className="text-lg font-semibold mb-2">Top Keyword</h2>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      {[1, 2, 3, 4].map((n) =>
                        topKeywords[n] ? (
                          <li key={n}>
                            <strong>{n}-kata:</strong> “{topKeywords[n].word}” -{" "}
                            {topKeywords[n].count} kali
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>

                  <div className="mt-2 text-center">
                    <button
                      onClick={exportToCSV}
                      className="block bg-gradient-to-r from-gray-800 to-slate-900 hover:ring-2 ring-cyan-500 font-medium text-white px-3 py-[7px] w-full text-center cursor-pointer rounded-lg text-sm"
                    >
                      Export ke CSV
                    </button>
                    <p className="text-xs mt-1 text-slate-500">
                      {" "}
                      ({ngram} Kata)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="md:w-[70%] border border-slate-300 p-6 rounded-md">
            {displayedNgrams.length > 0 ? (
              <div className="mx-auto">
                <h3 className="font-semibold mb-2">
                  Tabel Keyword ({ngram} Kata)
                </h3>
                <table className="w-full border text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Keyword</th>
                      <th className="border p-2 text-center">Jumlah</th>
                      <th className="border p-2 text-center">% Frekuensi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedNgrams.map(({ word, count, percentage }, i) => (
                      <tr key={i} className="border text-center">
                        <td className="border p-2 text-left">{word}</td>
                        <td className="border p-2">{count}</td>
                        <td className="border p-2">{percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="">
                <div className=" mx-auto animate-pulse">
                  <h3 className="font-semibold mb-2 bg-gray-300 rounded w-48 h-6"></h3>
                  <table className="w-full border text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">
                          <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </th>
                        <th className="border p-2 text-center">
                          <div className="h-4 bg-gray-300 rounded w-12 mx-auto"></div>
                        </th>
                        <th className="border p-2 text-center">
                          <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(10)].map((_, i) => (
                        <tr key={i} className="border text-center">
                          <td className="border p-2 text-left">
                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                          </td>
                          <td className="border p-2">
                            <div className="h-4 bg-gray-300 rounded w-8 mx-auto"></div>
                          </td>
                          <td className="border p-2">
                            <div className="h-4 bg-gray-300 rounded w-12 mx-auto"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

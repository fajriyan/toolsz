"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkPage = async () => {
    if (!url) return;

    setLoading(true);
    setResult(null);

    const res = await fetch("/layanan/page-size-checker/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="container mx-auto min-h-[83vh] z-0 px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Website Page Size Checker | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Masukkan URL untuk menguji ukuran halaman situs web Anda.
        </p>
      </div>

      <div className="md:w-[80%] xl:w-[50%] mx-auto mt-5">
        <div className="">
          <input
            type="text"
            placeholder="https://fajriyan.pages.dev"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border-2 border-cyan-600 px-2 py-3 rounded-lg"
          />

          <div className="mt-3">
            <button
              onClick={checkPage}
              disabled={loading}
              className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
            >
              {loading ? "Tunggu Sebentar ya" : "Cek Ukuran Website"}
            </button>
          </div>
        </div>

        <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-10">
          <span className="absolute text-sm bg-white -top-3 left-3 px-2">
            Output Analisis
          </span>
          {result && !result.error ? (
            <div className=" overflow-x-auto">
              <table className="w-full border border-gray-500 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3">Metric</th>
                    <th className="text-left px-4 py-3">Value</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3">Page Size (Bytes)</td>
                    <td className="px-4 py-3">{result.bytes}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">Page Size (KB)</td>
                    <td className="px-4 py-3">{result.kb}</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">Page Size (MB)</td>
                    <td className="px-4 py-3">{result.mb}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className=" overflow-x-auto">
              <table className="w-full border border-gray-500 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3">Metric</th>
                    <th className="text-left px-4 py-3">Value</th>
                  </tr>
                </thead>

                <tbody className="animate-pulse">
                  <tr className="border-t">
                    <td className="px-4 py-3">
                      <div className="h-4 bg-gray-300 rounded w-40"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">
                      <div className="h-4 bg-gray-300 rounded w-40"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-4 py-3">
                      <div className="h-4 bg-gray-300 rounded w-40"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {result?.error && (
          <p className="text-red-500 text-xs mt-6">{result.error}</p>
        )}
      </div>
    </div>
  );
}

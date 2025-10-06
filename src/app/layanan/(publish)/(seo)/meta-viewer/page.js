"use client";

import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [meta, setMeta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const normalizeUrl = (input) => {
    if (!input) return "";
    // kalau belum ada protokol, tambahkan https://
    if (!/^https?:\/\//i.test(input)) {
      return `https://${input}`;
    }
    return input;
  };

  const fetchMeta = async () => {
    setLoading(true);
    setError("");
    setMeta([]);

    try {
      const finalUrl = normalizeUrl(url);

      const res = await fetch("/layanan/meta-viewer/meta", {
        method: "POST",
        body: JSON.stringify({ url: finalUrl }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil meta");

      setMeta(data.meta);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto mb-10 px-3 md:px-0 min-h-[80dvh]">
      <div className="py-5 mb-10">
        <h1 className="text-xl text-center font-semibold">
          Meta Viewer | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Membantu anda melakukan inspeksi dengan cepat
        </p>
      </div>

      <div className=" gap-10 flex-col md:flex-row md:w-[80%] xl:w-[50%] mx-auto">
        <div className="w-full">
          <input
            type="text"
            placeholder="Masukkan URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-slate-400 p-2 w-full rounded mb-2"
          />

          <button
            onClick={fetchMeta}
            className="mt-2 bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
            disabled={loading}
          >
            {loading ? "Memuat..." : "Inspeksi Website"}
          </button>
        </div>
        <div className="border p-4 rounded-lg h-min sticky top-[80px] w-full z-0 mt-10">
          <div className="w-full">
            <h3 className="text-md font-semibold mb-2">Meta Detail:</h3>
            <div className="border rounded-lg border-slate-300 min-h-[100px] overflow-x-auto">
              <ul className="p-4 space-y-2">
                {meta.map((item, i) => (
                  <li key={i} className="text-sm">
                    <strong>{item.name || item.property}</strong>:{" "}
                    {item.content}
                  </li>
                ))}
              </ul>
            </div>
            {/* <div class="flex gap-3 mt-4">button</div> */}
          </div>

          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}

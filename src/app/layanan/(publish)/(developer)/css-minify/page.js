"use client";

import React, { useState } from "react";

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
    .replace(/\s*([:;{}])\s*/g, "$1") // Remove spaces around :, ;, {, and }
    .replace(/\s+/g, " ") // Collapse multiple spaces into one
    .replace(/([;,{}])\s*/g, "$1"); // Remove spaces after ;, ,, {, }
}

export default function MinifyCssPage() {
  const [originalCss, setOriginalCss] = useState("");
  const [minifiedCss, setMinifiedCss] = useState("");

  const handleMinify = () => {
    const minified = minifyCss(originalCss);
    setMinifiedCss(minified);
  };
  const handleClear = () => {
    if (confirm("Hapus Semua Minify CSS?")) {
      setOriginalCss("");
      setMinifiedCss("");
    }
  };

  return (
    <div className="container mx-auto h-screen px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          CSS Minify Online | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Buat baris kode CSS menjadi Kecil dan Ringan
        </p>
      </div>

      <div>
        <h2>Minify CSS</h2>
        <div>
          <textarea
            value={originalCss}
            onChange={(e) => setOriginalCss(e.target.value)}
            placeholder="Masukkan CSS disini"
            className="w-full md:h-[170px] p-2 border border-slate-800 rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <button
            className="bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
            onClick={handleMinify}
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-columns" viewBox="0 0 16 16">
            <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
          </svg>
            Minify CSS
          </button>
          <button
            className="border border-slate-800 px-5 py-[7px] rounded-md"
            onClick={handleClear}
          >
            Hapus
          </button>
        </div>

        <div className="mt-7">
          <h2>Hasil Minify CSS </h2>
          <textarea
            readOnly
            value={minifiedCss}
            placeholder="Hasil Minify CSS"
            className="w-full md:h-[170px] p-2 border border-slate-800 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

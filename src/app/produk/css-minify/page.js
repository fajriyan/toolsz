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
    if (confirm("Hapus Semua CSS?")) {
      setOriginalCss("");
      setMinifiedCss("");
    }
  };

  return (
    <div className="container mx-auto h-screen px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Online CSS Minify & Compressor
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
            className="bg-gradient-to-r from-gray-800 to-slate-900 text-white px-5 py-[7px] rounded-md"
            onClick={handleMinify}
          >
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
          <h2>Minified CSS Output</h2>
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

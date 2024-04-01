"use client";

// pages/unminifycss.js

import React, { useState } from "react";

function unminifyCss(minifiedCss) {
  return minifiedCss
    .replace(/;\s*/g, ";\n") // Add newline after semicolon
    .replace(/,\s*/g, ", ") // Add space after comma
    .replace(/{\s*/g, " {\n") // Add newline after {
    .replace(/\n\s*}\s*/g, "\n}\n") // Add newline after }
    .replace(/{\s*(.+?)\s*}/gs, (match, p1) => {
      const lines = p1.split("\n");
      const indentedLines = lines.map((line) => `    ${line}`).join("\n");
      return `{\n${indentedLines}\n}`;
    }); // Add 4 spaces at the beginning of each line inside {}
}

export default function UnminifyCssPage() {
  const [minifiedCss, setMinifiedCss] = useState("");
  const [originalCss, setOriginalCss] = useState("");

  const handleUnminify = () => {
    const unminified = unminifyCss(minifiedCss);
    setOriginalCss(unminified);
  };

  return (
    <div className="container mx-auto h-screen px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          CSS Unminify Online & Uncompress
        </h1>
        <p className="text-center text-xs">
          Kembalikan Baris kode CSS menjadi Rapi Kembali
        </p>
      </div>

      <div>
        <h2>Unminify CSS</h2>
        <div>
          <textarea
            value={minifiedCss}
            onChange={(e) => setMinifiedCss(e.target.value)}
            placeholder="Masukkan CSS Minify"
            className="w-full md:h-[170px] p-2 border border-slate-800 rounded-md"
          />
        </div>

        <div className="flex gap-2">
          <button
            className="bg-gradient-to-r from-gray-800 to-slate-900 text-white px-5 py-[7px] rounded-md"
            onClick={handleUnminify}
          >
            Unminify CSS
          </button>
          {/* <button
            className="border border-slate-800 px-5 py-[7px] rounded-md"
            onClick={handleClear}
          >
            Hapus
          </button> */}
        </div>

        <div className="mt-7">
          <h2>Hasil Unminify CSS </h2>
          <textarea
            readOnly
            value={originalCss}
            placeholder="Hasil CSS Murni Muncul Disini"
            className="w-full md:h-[170px] p-2 border border-slate-800 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

// pages/minifycss.js

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

  return (
    <div>
      <h1>Minify CSS</h1>
      <div>
        <textarea
          value={originalCss}
          onChange={(e) => setOriginalCss(e.target.value)}
          placeholder="Masukkan CSS di sini..."
          style={{ width: "100%", minHeight: "200px" }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button className="bg-slate-600" onClick={handleMinify}>
          Minify CSS
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <textarea
          readOnly
          value={minifiedCss}
          placeholder="Hasil CSS yang diminyakan akan muncul di sini..."
          style={{ width: "100%", minHeight: "200px" }}
        />
      </div>
    </div>
  );
}

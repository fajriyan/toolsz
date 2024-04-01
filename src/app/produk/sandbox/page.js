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
    <div>
      <h1>Unminify CSS</h1>
      <div>
        <textarea
          value={minifiedCss}
          onChange={(e) => setMinifiedCss(e.target.value)}
          placeholder="Masukkan CSS yang diminyakan di sini..."
          style={{ width: "100%", minHeight: "200px" }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleUnminify}>Restore CSS</button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <textarea
          readOnly
          value={originalCss}
          placeholder="Hasil CSS yang telah dikembalikan akan muncul di sini..."
          style={{ width: "100%", minHeight: "200px" }}
        />
      </div>
    </div>
  );
}

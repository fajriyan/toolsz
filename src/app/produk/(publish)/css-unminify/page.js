"use client";


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
  const [property, setProperty] = useState({minify:"", original:""});

  const handleUnminify = () => {
    const unminified = unminifyCss(minifiedCss);
    setOriginalCss(unminified);
  };

  const handleClear = () => {
    if (confirm("Hapus Semua Unminify CSS?")) {
      setOriginalCss("");
      setMinifiedCss("");
    }
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
            className="bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
            onClick={handleUnminify}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.397 14.841a1.13 1.13 0 0 0 .401.823q.195.162.478.252.284.091.665.091.507 0 .859-.158.354-.158.539-.44.187-.284.187-.656 0-.336-.134-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.566-.21l-.621-.144a1 1 0 0 1-.404-.176.37.37 0 0 1-.144-.299q0-.234.185-.384.188-.152.512-.152.214 0 .37.068a.6.6 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.2-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.439 0-.776.15-.337.149-.527.421-.19.273-.19.639 0 .302.122.524.124.223.352.367.228.143.539.213l.618.144q.31.073.463.193a.39.39 0 0 1 .152.326.5.5 0 0 1-.085.29.56.56 0 0 1-.255.193q-.167.07-.413.07-.175 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384zM.806 13.693q0-.373.102-.633a.87.87 0 0 1 .302-.399.8.8 0 0 1 .475-.137q.225 0 .398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.4 1.4 0 0 0-.489-.272 1.8 1.8 0 0 0-.606-.097q-.534 0-.911.223-.375.222-.572.632-.195.41-.196.979v.498q0 .568.193.976.197.407.572.626.375.217.914.217.439 0 .785-.164t.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.8.8 0 0 1-.118.363.7.7 0 0 1-.272.25.9.9 0 0 1-.401.087.85.85 0 0 1-.478-.132.83.83 0 0 1-.299-.392 1.7 1.7 0 0 1-.102-.627zM6.78 15.29a1.2 1.2 0 0 1-.111-.449h.764a.58.58 0 0 0 .255.384q.106.073.25.114.142.041.319.041.245 0 .413-.07a.56.56 0 0 0 .255-.193.5.5 0 0 0 .085-.29.39.39 0 0 0-.153-.326q-.152-.12-.463-.193l-.618-.143a1.7 1.7 0 0 1-.539-.214 1 1 0 0 1-.351-.367 1.1 1.1 0 0 1-.123-.524q0-.366.19-.639.19-.272.527-.422t.777-.149q.456 0 .779.152.326.153.5.41.18.255.2.566h-.75a.56.56 0 0 0-.12-.258.6.6 0 0 0-.246-.181.9.9 0 0 0-.37-.068q-.324 0-.512.152a.47.47 0 0 0-.184.384q0 .18.143.3a1 1 0 0 0 .404.175l.621.143q.326.075.566.211t.375.358.135.56q0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252 1.1 1.1 0 0 1-.29-.375"/>
            </svg>  
            Unminify CSS
          </button>
          <button
            className="border border-slate-800 px-5 py-[7px] rounded-md"
            onClick={handleClear}
          >
            Hapus
          </button>
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

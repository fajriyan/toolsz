"use client";

import { useState } from "react";
import { decodeBase64, encodeBase64 } from "@/lib/base64.mjs";

const MODES = [
  { id: "encode", label: "Encode" },
  { id: "decode", label: "Decode" },
];

export default function Base64ConverterPage() {
  const [mode, setMode] = useState("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (nextMode, nextInput, nextUrlSafe) => {
    if (!nextInput) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const result =
        nextMode === "encode"
          ? encodeBase64(nextInput, { urlSafe: nextUrlSafe })
          : decodeBase64(nextInput, { urlSafe: nextUrlSafe });
      setOutput(result);
      setError("");
    } catch (e) {
      setOutput("");
      setError(e.message);
    }
  };

  const handleInput = (value) => {
    setInput(value);
    run(mode, value, urlSafe);
  };

  const handleMode = (nextMode) => {
    setMode(nextMode);
    run(nextMode, input, urlSafe);
  };

  const handleUrlSafe = (checked) => {
    setUrlSafe(checked);
    run(mode, input, checked);
  };

  const handleSwap = () => {
    const nextMode = mode === "encode" ? "decode" : "encode";
    setMode(nextMode);
    setInput(output);
    setOutput("");
    run(nextMode, output, urlSafe);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  return (
    <main className="container mx-auto min-h-[83vh] z-0 px-3 md:px-0 pb-20">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Base64 Encoder/Decoder | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Ubah teks menjadi Base64 atau kembalikan Base64 menjadi teks asli.
        </p>
      </div>

      <div className="md:w-[90%] xl:w-[70%] mx-auto mt-7">
        <div className="border border-slate-700 rounded-md p-3 pt-4 relative">
          <span className="absolute text-sm bg-white -top-3 left-3 px-2">
            Pengaturan
          </span>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              {MODES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMode(item.id)}
                  aria-pressed={mode === item.id}
                  className={`px-3 py-1 text-sm rounded ${
                    mode === item.id
                      ? "bg-slate-800 text-white"
                      : "bg-slate-200 text-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                id="base64-url-safe"
                type="checkbox"
                checked={urlSafe}
                onChange={(e) => handleUrlSafe(e.target.checked)}
                className="w-4 h-4"
              />
              URL safe (- _ tanpa =)
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <div className="border border-slate-700 rounded-md p-2 relative">
              <span className="absolute text-xs bg-white -top-2 left-2 px-1">
                {mode === "encode" ? "Teks asli" : "Base64"}
              </span>
              <textarea
                value={input}
                onChange={(e) => handleInput(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? "Tulis teks untuk di-encode..."
                    : "Tempel Base64 untuk di-decode..."
                }
                rows={10}
                spellCheck={false}
                aria-label="Input"
                className="w-full resize-none p-1 text-sm font-mono"
              />
            </div>

            <div className="border border-slate-700 rounded-md p-2 relative">
              <span className="absolute text-xs bg-white -top-2 left-2 px-1">
                {mode === "encode" ? "Base64" : "Teks asli"}
              </span>
              <textarea
                value={output}
                readOnly
                rows={10}
                aria-label="Output"
                className="w-full resize-none p-1 text-sm font-mono bg-slate-50"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2" role="alert">
              Gagal memproses: {error.trim()}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={copy}
              disabled={!output}
              className="px-3 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 disabled:opacity-40"
            >
              Salin hasil
            </button>
            <button
              type="button"
              onClick={handleSwap}
              disabled={!output}
              className="px-3 py-2 border border-slate-700 rounded-md hover:bg-slate-100 disabled:opacity-40"
            >
              Tukar
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-2 border border-slate-700 rounded-md hover:bg-slate-100"
            >
              Bersihkan
            </button>
          </div>

          <footer className="text-sm text-slate-500 mt-4">
            {input.length} karakter input, {output.length} karakter output.
            Mendukung teks multibyte seperti emoji dan karakter Asia.
          </footer>
        </div>
      </div>
    </main>
  );
}

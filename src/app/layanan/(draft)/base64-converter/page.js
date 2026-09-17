"use client";

import { useState } from "react";

export default function Base64ConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      setError("");
      if (!input.trim()) {
        setOutput("");
        return;
      }
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e) {
      setError("Input tidak valid untuk decode Base64");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setError("");
  };

  return (
    <main className="container mx-auto min-h-[83vh] z-0 px-3 md:px-0 pb-20">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Base64 Encoder/Decoder | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Encode dan decode teks ke/from Base64 dengan cepat.
        </p>
      </div>

      <div className="md:w-[80%] xl:w-[50%] mx-auto mt-7">
        <div className="border border-slate-500 rounded-lg p-3 pt-4 relative">
          <span className="absolute text-sm bg-white -top-3 left-3 px-2">
            Pengaturan
          </span>

          <div className="flex items-center gap-2 mb-4">
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                mode === "encode"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setMode("encode");
                setOutput("");
                setError("");
              }}
            >
              Encode
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                mode === "decode"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setMode("decode");
                setOutput("");
                setError("");
              }}
            >
              Decode
            </button>
          </div>

          <div className="mb-3">
            <label className="block text-sm text-slate-500 mb-1">
              {mode === "encode" ? "Teks Input" : "Base64 Input"}
            </label>
            <textarea
              className="w-full p-2 border rounded-md font-mono text-sm h-32 resize-y"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Masukkan teks untuk di-encode..."
                  : "Masukkan string Base64 untuk di-decode..."
              }
            />
          </div>

          <div className="flex gap-2 mb-3">
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 text-sm"
              onClick={handleConvert}
            >
              {mode === "encode" ? "Encode" : "Decode"}
            </button>
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
              onClick={handleSwap}
              disabled={!output}
            >
              Swap Input/Output
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-3" role="alert">
              {error}
            </p>
          )}

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-slate-500">
                {mode === "encode" ? "Base64 Output" : "Teks Output"}
              </label>
              {output && (
                <button
                  className="text-xs text-gray-500 hover:text-gray-700"
                  onClick={handleCopy}
                >
                  {copied ? "Tersalin!" : "Salin"}
                </button>
              )}
            </div>
            <textarea
              className="w-full p-2 border rounded-md font-mono text-sm h-32 resize-y bg-slate-50"
              value={output}
              readOnly
              placeholder="Hasil akan muncul di sini..."
            />
          </div>

          <footer className="text-sm text-slate-500">
            Mendukung encode/decode Base64 untuk teks UTF-8.
          </footer>
        </div>
      </div>
    </main>
  );
}

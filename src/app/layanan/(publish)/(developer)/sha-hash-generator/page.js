"use client";

import { useState } from "react";

export default function SHAForm() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [result, setResult] = useState("");

  const hashText = async (text, algorithm) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest(algorithm, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (error) {
      console.error("Hashing error:", error);
      return "Error hashing text.";
    }
  };

  const handleConvert = async () => {
    const hashed = await hashText(text, algorithm);
    setResult(hashed);
  };

  return (
    <div className="">
      <div className="container mx-auto min-h-[83vh] z-0 px-3 md:px-0">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            SHA Hash Generator | Developer Tools
          </h1>
          <p className="text-center text-xs">
            Mendukung Konversi SHA 1, SHA 256, SHA 384, SHA 512
          </p>
        </div>
        <div className="">
          <div className="mb-4">
            <label className="block font-medium mb-2">Text to Hash:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[200px] border p-2 border-slate-600 rounded-md"
              rows={4}
            />
          </div>

          <div className="mb-4 flex gap-3">
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="px-3 py-2 border border-slate-500 rounded-lg"
            >
              <option value="SHA-1">SHA-1</option>
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-384">SHA-384</option>
              <option value="SHA-512">SHA-512</option>
            </select>
            <button
              onClick={handleConvert}
              className="flex bg-gradient-to-r from-gray-800 to-slate-900 hover:from-cyan-950 hover:to-cyan-950 font-medium text-white px-3 py-[7px] min-w-max rounded-lg gap-1 items-center"
            >
              Convert
            </button>
          </div>

          <div className="mt-6">
            <label className="block font-medium mb-2">Hashed Result:</label>
            <div className="w-full min-h-[100px] border p-2 border-slate-600 rounded-md">
              {result}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

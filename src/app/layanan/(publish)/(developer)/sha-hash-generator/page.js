"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    toast((t) => (
      <div className="flex items-center gap-2">
        Copy behasil
        <button onClick={() => toast.dismiss(t.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>
      </div>
    ));
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
        <div className="md:w-[80%] xl:w-[50%] mx-auto mt-7">
          <div className="mb-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[200px] p-2 border-2 border-cyan-600 rounded-lg resize-none"
              placeholder="Masukkan Text untuk Hash disini"
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

          {result && result.length > 0 && (
            <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
              <span className="absolute text-sm bg-white -top-3 left-3 px-2">
                Output CDN Scripts
              </span>
              <div className="w-full min-h-[100px] border-none rounded-md">
                {result}
              </div>
              <button
                onClick={handleCopy}
                className="bg-gradient-to-r absolute top-3 right-3 from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-copy"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

export default function RemoveWhitespacePage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleRemoveWhitespace = () => {
    const cleaned = input.replace(/\s+/g, "");
    setOutput(cleaned);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset "copied" after 2 seconds
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div>
      <div className="container mx-auto pb-[80px] sm:py-0 sm:min-h-[83vh] z-0 px-3 md:px-0">
        <div className="py-5 mb-10">
          <h1 className="text-xl text-center font-semibold">
            Remove Whitespace | SEO Tools
          </h1>
          <p className="text-center text-xs">
            Bersihkan Whitespace pada kalimat, link atau apapun dengan mudah
          </p>
        </div>
        <div className="flex flex-col gap-10 md:w-[80%] xl:w-[50%] mx-auto">
          <div className="">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Silahkan Masukkan kata/ link disini"
              className="border border-slate-700 rounded w-full h-48 py-2 px-3"
            />
            <button
              onClick={handleRemoveWhitespace}
              className="mt-4 bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
            >
              Hapus Whitespace
            </button>
          </div>
          <div className="">
            <textarea
              value={output}
              readOnly
              placeholder="Hasil Akan tampil disini"
              className="border border-slate-700 rounded w-full h-48 py-2 px-3"
            />
            <button
              onClick={handleCopy}
              className="mt-4 bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
            >
              {copied ? (
                <svg
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

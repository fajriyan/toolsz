"use client";

import { useState } from "react";

export default function SlugGeneratorPage() {
  const [text, setText] = useState("");
  const [lowercase, setLowercase] = useState(true);
  const [separator, setSeparator] = useState("-");
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const [copied, setCopied] = useState(false);

  const stopWords = [
    "dan",
    "atau",
    "yang",
    "di",
    "ke",
    "dari",
    "the",
    "a",
    "an",
    "of",
    "to",
    "in",
    "for",
    "with",
  ];

  const slugify = (value) => {
    let result = value;

    if (removeStopWords) {
      const regex = new RegExp(`\\b(${stopWords.join("|")})\\b`, "gi");
      result = result.replace(regex, "");
    }

    if (removeNumbers) {
      result = result.replace(/[0-9]/g, "");
    }

    let slug = result
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, separator)
      .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");

    return lowercase ? slug.toLowerCase() : slug;
  };

  const slugResult = slugify(text);

  const copySlug = async () => {
    if (!slugResult) return;
    await navigator.clipboard.writeText(slugResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const clearText = () => {
    setText("");
  };

  const resetAll = () => {
    setText("");
    setLowercase(true);
    setSeparator("-");
    setRemoveStopWords(false);
    setRemoveNumbers(false);
  };

  return (
    <div className="container mx-auto min-h-[83vh] z-0 px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          URL Slug Generator | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Generate URL-friendly slug dari teks dengan pilihan lowercase,
          separator, dan pembersihan kata.
        </p>
      </div>

      <div className="md:w-[80%] xl:w-[50%] mx-auto">
        <input
          type="text"
          className="w-full border-2 border-cyan-600 px-2 py-3 rounded-lg"
          placeholder="Masukkan Text Disini"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ resize: "none" }}
        />

        <div className="grid grid-cols-2 gap-5 border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
          <span className="absolute text-sm bg-white -top-3 left-3 px-2">
            Pengaturan
          </span>
          <select
            className="border p-1 rounded"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          >
            <option value="-">Dash (-)</option>
            <option value="_">Underscore (_)</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="peer hidden"
            />
            <span
              className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center
                   peer-checked:bg-gray-700 peer-checked:border-gray-700
                   transition"
            >
              <svg
                className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 011.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-sm">Lowercase</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeStopWords}
              onChange={(e) => setRemoveStopWords(e.target.checked)}
              className="peer hidden"
            />
            <span
              className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center
                   peer-checked:bg-gray-700 peer-checked:border-gray-700 transition"
            >
              <svg
                className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 011.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                />
              </svg>
            </span>
            <span className="text-sm">Remove stop words</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeNumbers}
              onChange={(e) => setRemoveNumbers(e.target.checked)}
              className="peer hidden"
            />
            <span
              className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center
                   peer-checked:bg-gray-700 peer-checked:border-gray-700 transition"
            >
              <svg
                className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 011.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
                />
              </svg>
            </span>
            <span className="text-sm">Remove numbers</span>
          </label>
        </div>

        <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
          <span className="absolute text-sm bg-white -top-3 left-3 px-2">
            Output Slug
          </span>
          <input
            className="w-full border p-2 rounded bg-gray-100 focus-within:outline-none"
            value={slugResult}
            readOnly
          />
        </div>

        <div className="flex gap-3 mt-3">
          <button
            onClick={copySlug}
            className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
          >
            {copied ? "Copied!" : "Copy Slug"}
          </button>

          <button
            onClick={clearText}
            className=" bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
          >
            Clear
          </button>

          <button onClick={resetAll} className="py-2 text-gray-800 text-sm">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

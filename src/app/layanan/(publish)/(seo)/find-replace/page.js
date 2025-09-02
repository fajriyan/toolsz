"use client";
import { useState } from "react";

export default function FindReplacePage() {
  const [originalText, setOriginalText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [resultText, setResultText] = useState("");
  const [useRegex, setUseRegex] = useState(false);
  const [regexError, setRegexError] = useState(null);

  const handleReplace = () => {
    setRegexError(null);

    try {
      let replaced = "";
      if (useRegex) {
        const pattern = new RegExp(searchText, "g");
        replaced = originalText.replace(pattern, replaceText);
      } else {
        const pattern = new RegExp(escapeRegExp(searchText), "g");
        replaced = originalText.replace(pattern, replaceText);
      }
      setResultText(replaced);
    } catch (err) {
      setRegexError("❌ Invalid Regex Pattern");
    }
  };

  // Helper untuk escape jika mode biasa (bukan regex)
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  return (
    <div className="container mx-auto min-h-screen px-3 md:px-0 pb-32">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Cari dan Ganti Kata | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Cari Kata dan Ganti dengan text / dengan regex
        </p>
      </div>

      <textarea
        className="w-full p-2 border border-slate-700 rounded"
        rows="6"
        placeholder="Masukkan teks asli di sini..."
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
      />

      <div className="flex items-center flex-col sm:flex-row gap-2 mt-3">
        <input
          type="text"
          placeholder={useRegex ? "Masukkan Regex pattern" : "Cari kata..."}
          className="flex-1 p-2 border border-slate-700 rounded w-full sm:w-1/2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ganti dengan..."
          className="flex-1 p-2 border border-slate-700 rounded w-full sm:w-1/2"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 mt-3">
        <input
          type="checkbox"
          id="regex-mode"
          checked={useRegex}
          onChange={(e) => setUseRegex(e.target.checked)}
        />
        <label htmlFor="regex-mode">Gunakan Regex</label>
      </div>

      {useRegex && (
        <p className="text-sm text-gray-600 italic">
          Masukkan pola regex seperti: <code>\d+</code>, <code>\s*</code>, dll
        </p>
      )}

      {regexError && <p className="text-red-600 text-sm">{regexError}</p>}

      <button
        className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800 mt-7"
        onClick={handleReplace}
      >
        Replace
      </button>

      {resultText && (
        <div>
          <h2 className="font-semibold mt-4">Hasil:</h2>
          <div className="whitespace-pre-wrap border p-2 rounded bg-gray-50">
            {resultText}
          </div>
        </div>
      )}
    </div>
  );
}

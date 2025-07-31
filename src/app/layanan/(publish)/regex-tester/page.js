"use client";

import { useState } from "react";

export default function Page() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [matches, setMatches] = useState([]);

  const presets = [
    {
      label: "— Pilih Preset —",
      pattern: "",
      flags: "g",
    },
    {
      label: "Email",
      pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
      flags: "g",
    },
    {
      label: "URL",
      pattern: "https?://[^\\s]+",
      flags: "g",
    },
    {
      label: "Angka (digit)",
      pattern: "\\d+",
      flags: "g",
    },
    {
      label: "Huruf saja",
      pattern: "[a-zA-Z]+",
      flags: "g",
    },
    {
      label: "Spasi berlebihan",
      pattern: "\\s+",
      flags: "g",
    },
    {
      label: "Nomor Telepon (Indonesia)",
      pattern: "(\\+62|0)8[1-9][0-9]{6,9}",
      flags: "g",
    },
    {
      label: "Kode Pos Indonesia (5 digit)",
      pattern: "\\b\\d{5}\\b",
      flags: "g",
    },
    {
      label: "Tanggal (YYYY-MM-DD)",
      pattern: "\\b\\d{4}-\\d{2}-\\d{2}\\b",
      flags: "g",
    },
    {
      label: "Tanggal (DD/MM/YYYY)",
      pattern: "\\b\\d{2}/\\d{2}/\\d{4}\\b",
      flags: "g",
    },
    {
      label: "Jam (HH:MM)",
      pattern: "\\b\\d{2}:\\d{2}\\b",
      flags: "g",
    },
    {
      label: "Waktu Lengkap (HH:MM:SS)",
      pattern: "\\b\\d{2}:\\d{2}:\\d{2}\\b",
      flags: "g",
    },
    {
      label: "Hex Color (#rrggbb)",
      pattern: "#[0-9a-fA-F]{6}\\b",
      flags: "g",
    },
    {
      label: "CSS Class Selector",
      pattern: "\\.[a-zA-Z0-9_-]+",
      flags: "g",
    },
    {
      label: "HTML Tag",
      pattern: "<\\/?[a-zA-Z][a-zA-Z0-9]*\\b[^>]*>",
      flags: "g",
    },
    {
      label: "IP Address",
      pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
      flags: "g",
    },
    {
      label: "Username (alphanumeric + underscore)",
      pattern: "\\b[a-zA-Z0-9_]{3,}\\b",
      flags: "g",
    },
    {
      label: "Hashtag",
      pattern: "#\\w+",
      flags: "g",
    },
    {
      label: "Mention (Twitter/IG)",
      pattern: "@\\w+",
      flags: "g",
    },
    {
      label: "Angka Desimal",
      pattern: "\\b\\d+\\.\\d+\\b",
      flags: "g",
    },
  ];

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      setError("");

      const results = [];
      let match;
      while ((match = regex.exec(text)) !== null) {
        results.push({
          match: match[0],
          index: match.index,
        });

        if (regex.lastIndex === match.index) regex.lastIndex++;
      }

      setMatches(results);
    } catch (err) {
      setError(err.message);
      setMatches([]);
    }
  };

  const handlePresetChange = (e) => {
    const selected = presets[e.target.value];
    if (selected) {
      setPattern(selected.pattern);
      setFlags(selected.flags);
    }
  };

  const getHighlightedText = () => {
    if (!matches.length) return text;

    let result = "";
    let lastIndex = 0;

    matches.forEach(({ match, index }) => {
      result += text.substring(lastIndex, index);
      result += `<mark class="bg-yellow-300">${match}</mark>`;
      lastIndex = index + match.length;
    });

    result += text.substring(lastIndex);
    return result;
  };

  return (
    <div>
      <div className="container mx-auto min-h-[83vh] z-0 px-3 md:px-0 pb-10">
        <div className="py-5 mb-8">
          <h1 className="text-xl text-center font-semibold">
            Regex Tester | Developer Tools
          </h1>
          <p className="text-center text-xs">
            Uji dan Kembangkan Pola Regex Anda
          </p>
        </div>

        <div className="bg-white rounded-xl flex gap-10 flex-col md:flex-row">
          <div className="md:w-[50%] space-y-3">
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Preset Regex</label>
                <select
                  onChange={handlePresetChange}
                  className="w-full p-2 border border-slate-300 rounded"
                >
                  {presets.map((preset, idx) => (
                    <option key={idx} value={idx}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Pola Regex</label>
                <input
                  type="text"
                  className="w-full p-2 border border-slate-300 rounded"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="e.g. hello\\d+"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Flags (optional)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-slate-300 rounded"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  placeholder="e.g. gi"
                />
              </div>
            </div>

            <div className="">
              <div>
                <label className="block font-semibold mb-1">
                  Masukkan Text Disini
                </label>
                <textarea
                  rows="5"
                  className="w-full p-2 border border-slate-300 rounded"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text here..."
                />
              </div>

              <button
                onClick={testRegex}
                className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-4 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800 flex items-center gap-2 mt-4"
              >
                Tes Pola Regex
              </button>

              {error && <p className="text-red-600 font-semibold">{error}</p>}
            </div>
          </div>

          <div className="md:w-[50%]">
            <div className="p-3 border border-slate-300 rounded-md">
              <p className="font-bold text-sm mb-2">
                Hasil yang ditemukan: {matches.length}
              </p>
              <pre
                className="whitespace-pre-wrap border border-slate-300 rounded-md h-[400px] sm:h-[500px] overflow-y-auto p-1"
                dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
              />
            </div>

            {!error && matches.length === 0 && text && (
              <p className="text-gray-500">No match found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

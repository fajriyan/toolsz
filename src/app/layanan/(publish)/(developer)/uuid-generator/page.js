"use client";

import { useState } from "react";

/**
 * UUID v4 (RFC 4122 compliant)
 */
function uuidv4() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  // version 4
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // variant
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0"));

  return (
    hex.slice(0, 4).join("") +
    "-" +
    hex.slice(4, 6).join("") +
    "-" +
    hex.slice(6, 8).join("") +
    "-" +
    hex.slice(8, 10).join("") +
    "-" +
    hex.slice(10, 16).join("")
  );
}

/**
 * UUID v1 (timestamp-based, approximation)
 * Catatan: bukan RFC v1 murni (tanpa MAC & clock sequence)
 */
function uuidv1() {
  const now = Date.now();
  const timeHex = now.toString(16).padStart(12, "0");
  const random = crypto.getRandomValues(new Uint8Array(8));
  const randHex = [...random]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return (
    timeHex.slice(0, 8) +
    "-" +
    timeHex.slice(8, 12) +
    "-1" +
    randHex.slice(0, 3) +
    "-" +
    randHex.slice(3, 7) +
    "-" +
    randHex.slice(7, 19)
  );
}

export default function UUIDGenerator() {
  const [version, setVersion] = useState("v4");
  const [amount, setAmount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [braces, setBraces] = useState(false);
  const [result, setResult] = useState([]);

  const generate = () => {
    const total = Math.min(Math.max(amount, 1), 10000);
    const list = [];

    for (let i = 0; i < total; i++) {
      let id = version === "v1" ? uuidv1() : uuidv4();

      if (uppercase) id = id.toUpperCase();
      if (braces) id = `{${id}}`;

      list.push(id);
    }

    setResult(list);
  };

  return (
    <div className="container mx-auto min-h-[84vh] z-0 px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          UUID Generator | Developer Tools
        </h1>
        <p className="text-center text-xs">
          Generate UUID v1 (timestamp-based) dan v4 (random) secara instan
          dengan opsi jumlah, huruf besar, dan format kurung.
        </p>
      </div>

      <div className="md:w-[80%] xl:w-[50%] mx-auto">
        <div className="grid grid-cols-2 gap-5 border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
          <span className="absolute text-sm bg-white -top-3 left-3 px-2">
            Pengaturan
          </span>
          <div>
            <label className="block font-medium mb-1 text-sm">
              UUID Version
            </label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="border rounded px-2 py-[8px] w-full"
            >
              <option value="v1">Version 1 (Timestamp-based)</option>
              <option value="v4">Version 4 (Random)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm">
              Amount <small className="text-gray-500">(1 - 10000)</small>
            </label>
            <input
              type="number"
              min={1}
              max={10000}
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              className="border rounded px-2 py-1.5 w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Options</label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
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
              <span className="text-sm">Uppercase</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={braces}
                onChange={(e) => setBraces(e.target.checked)}
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
              <span className="text-sm"> Braces</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-3">
          <button
            onClick={generate}
            className="bg-gradient-to-r hover:bg-gradient-to-b text-sm from-gray-800 to-slate-700 hover:to-slate-950 text-white px-5 py-2 rounded-lg flex items-center gap-1"
          >
            Generate UUID
          </button>
        </div>

        <div className="border border-slate-500 rounded-lg p-3 pt-5 relative mt-5">
          <span className="absolute text-sm bg-white -top-3 left-3 px-2">
            UUID Output
          </span>
          <textarea
            readOnly
            className="w-full h-64 rounded font-mono border-none focus-within:outline-none resize-none"
            value={result.join("\n")}
          />
        </div>
      </div>
    </div>
  );
}

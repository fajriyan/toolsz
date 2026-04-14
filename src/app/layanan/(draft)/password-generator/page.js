"use client";

import { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";

export default function Page() {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(false);

  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [bulk, setBulk] = useState(5);

  // charset builder
  const getChars = () => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumber) chars += "0123456789";
    if (includeSymbol) chars += "!@#$%^&*()_+-={}[]<>?/";
    return chars;
  };

  const createPassword = () => {
    const chars = getChars();
    if (!chars) return "";

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const generateAll = () => {
    const single = createPassword();
    setPassword(single);

    const list = [];
    for (let i = 0; i < bulk; i++) {
      list.push(createPassword());
    }
    setPasswords(list);
  };

  // auto generate
  useEffect(() => {
    generateAll();
  }, [length, includeUpper, includeLower, includeNumber, includeSymbol, bulk]);

  // strength from zxcvbn
  const strengthResult = zxcvbn(password);
  const score = strengthResult.score; // 0 - 4

  const strengthMap = [
    { label: "Very Weak", color: "bg-red-500", width: "20%" },
    { label: "Weak", color: "bg-orange-500", width: "40%" },
    { label: "Fair", color: "bg-yellow-500", width: "60%" },
    { label: "Good", color: "bg-blue-500", width: "80%" },
    { label: "Strong", color: "bg-green-500", width: "100%" },
  ];

  const strength = strengthMap[score];

  const copy = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-xl font-bold text-center">Password Generator</h1>

        {/* main password */}
        <div className="flex gap-2">
          <input
            value={password}
            readOnly
            className="w-full p-3 border rounded-lg text-sm"
          />
          <button
            onClick={generateAll}
            className="px-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            title="Regenerate"
          >
            🔄
          </button>
        </div>

        <button
          onClick={() => copy(password)}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Copy
        </button>

        {/* strength */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Strength</span>
            <span>{strength.label}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className={`h-2 ${strength.color} transition-all duration-500`}
              style={{ width: strength.width }}
            />
          </div>
        </div>

        {/* length */}
        <div>
          <label className="text-sm">Length: {length}</label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* bulk */}
        <div>
          <label className="text-sm">Bulk generate: {bulk}</label>
          <input
            type="range"
            min="1"
            max="20"
            value={bulk}
            onChange={(e) => setBulk(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* options */}
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={() => setIncludeUpper(!includeUpper)}
            />
            Uppercase
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={() => setIncludeLower(!includeLower)}
            />
            Lowercase
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumber}
              onChange={() => setIncludeNumber(!includeNumber)}
            />
            Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeSymbol}
              onChange={() => setIncludeSymbol(!includeSymbol)}
            />
            Symbols
          </label>
        </div>

        {/* bulk list */}
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">Generated List</h2>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {passwords.map((pwd, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <span className="text-xs break-all">{pwd}</span>
                <button
                  onClick={() => copy(pwd)}
                  className="text-xs text-blue-500"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

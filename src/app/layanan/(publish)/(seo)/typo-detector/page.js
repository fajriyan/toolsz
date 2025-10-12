"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [lang, setLang] = useState("id");
  const [errors, setErrors] = useState([]);
  const [exclude, setExclude] = useState(""); // NEW

  const checkSpelling = async () => {
    const res = await fetch("/layanan/typo-detector/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang, exclude }),
    });
    const data = await res.json();
    setErrors(data.errors);
  };

  return (
    <div className="min-h-[85dvh]">
      <div className="container mx-auto min-h-[82vh] px-3 md:px-0">
        <div className="py-5">
          <h1 className="text-xl text-center font-semibold">
            Typo Detector | SEO Tools (Alpha 1)
          </h1>
          <p className="text-center text-xs mt-1">
            Silahkan cek kalimat kalian, apakah terdapat typo yang bisa di
            perbaiki.
          </p>
        </div>

        <textarea
          className="border border-slate-500 rounded-md p-2 w-full"
          rows={15}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tulis teks di sini..."
        />

        <div className="flex flex-col sm:flex-row gap-3 md:items-center">
          <div>
            <select
              className="border border-slate-500 rounded w-full py-2 px-3"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="id">Indonesia</option>
              <option value="en">English (US)</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              className="border border-slate-500 rounded w-full py-2 px-3 md:min-w-[400px]"
              value={exclude}
              onChange={(e) => setExclude(e.target.value)}
              placeholder="Exclude Kata (pisahkan dengan koma)"
            />
          </div>
        </div>

        <button
          onClick={checkSpelling}
          className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-4 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800 flex items-center gap-2 mt-5"
        >
          Cek Typo
        </button>

        {errors.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold">Hasil:</h2>
            <ul className="list-disc pl-6">
              {errors.map((err, i) => (
                <li key={i}>
                  <strong>{err.word}</strong> → saran:{" "}
                  {err.suggestions.join(", ") || "tidak ada"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

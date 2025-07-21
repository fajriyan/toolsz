"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Tesseract from "tesseract.js";

const LANGUAGES = [
  { code: "eng", label: "English" },
  { code: "ind", label: "Indonesian" },
  { code: "ara", label: "Arabic" },
  { code: "jpn", label: "Japanese" },
  { code: "chi_sim", label: "Chinese (Simplified)" },
  { code: "spa", label: "Spanish" },
  { code: "fra", label: "French" },
];

export default function OCRPage() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [corrected, setCorrected] = useState("");
  const [loading, setLoading] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [language, setLanguage] = useState("eng");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult("");
      setCorrected("");
    }
  };

  const handleOCR = async () => {
    setLoading(true);
    setResult("");
    setCorrected("");

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(image, language, {
        logger: (m) => console.log(m),
      });

      setResult(text);
    } catch (error) {
      console.error(error);
      setResult("Terjadi kesalahan saat memproses gambar.");
    }

    setLoading(false);
  };

  const handleCorrect = async () => {
    if (!result) return;

    setFixing(true);

    try {
      const params = new URLSearchParams();
      params.append("text", result);
      params.append("language", mapToLT(language));
      const langCode = mapToLT(language);
      if (!langCode) {
        toast.error("Maaf, koreksi typo untuk bahasa ini belum didukung.");
        setFixing(false);
        return;
      }

      const res = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      const data = await res.json();

      let fixed = result;
      const matches = data.matches;

      matches
        .sort((a, b) => b.offset - a.offset)
        .forEach((match) => {
          if (match.replacements.length > 0) {
            fixed =
              fixed.slice(0, match.offset) +
              match.replacements[0].value +
              fixed.slice(match.offset + match.length);
          }
        });

      setCorrected(fixed);
    } catch (err) {
      console.error(err);
      setCorrected("Gagal memeriksa kesalahan.");
    }

    setFixing(false);
  };

  const mapToLT = (lang) => {
    switch (lang) {
      case "eng":
        return "en-US";
      case "fra":
        return "fr";
      case "spa":
        return "es";
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto min-h-[84vh] pb-20 px-3 lg:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Konversi Gambar ke Teks (ORC) | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Konversikan Gambar kalian menjadi teks dengan mudah
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 mt-5">
        <div className="lg:w-[40%]">
          <div className="flex gap-4 items-center">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-3 py-2 w-[30%]"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-[70%] block text-sm text-gray-500 border border-slate-200 rounded-md
             file:mr-4 file:py-2.5 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-slate-200 file:text-slate-700
             hover:file:bg-slate-100"
            />
          </div>

          {image && (
            <div>
              <img
                src={image}
                alt="Preview"
                className="max-w-full h-[53dvh] mt-4 border border-slate-300 rounded-md object-contain"
              />
              <button
                className="mt-2 bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
                onClick={handleOCR}
              >
                {loading ? "Memproses..." : "Analisis Gambar"}
              </button>
            </div>
          )}
        </div>

        <div className="lg:w-[60%] space-y-4">
          {result && (
            <div>
              <h2 className="text-lg font-semibold">Hasil OCR:</h2>
              <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap h-[30dvh] overflow-y-auto">
                {result}
              </pre>

              <button
                onClick={handleCorrect}
                className="mt-2 bg-gradient-to-r hover:bg-gradient-to-b from-gray-800 to-slate-900 hover:to-slate-950 text-white px-5 py-[7px] rounded-md flex items-center gap-1"
              >
                {fixing ? "Memeriksa..." : "Perbaiki Typo"}
              </button>
            </div>
          )}

          {corrected && (
            <div>
              <h2 className="text-lg font-semibold">
                Teks Setelah Diperbaiki:
              </h2>
              <pre className="bg-green-100 p-4 rounded whitespace-pre-wrap h-[30dvh] overflow-y-auto">
                {corrected}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

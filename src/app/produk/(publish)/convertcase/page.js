"use client";

import React, { useState } from "react";

export default function MinifyCssPage() {
  const [inputText, setInputText] = useState("");
  const [convertText, setConvertText] = useState("");
  const [stateGroup, setStateGroup] = useState({
    statusCopy: null,
  });

  const handleInputChange = (event) => {
    setInputText(event);
    setStateGroup({ statusCopy: "waiting" });
  };

  const convertToUppercase = () => {
    setConvertText(inputText.toUpperCase());
    setStateGroup({ statusCopy: "converted" });
  };

  const convertToCapitalize = () => {
    const words = inputText.toLowerCase().split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    setConvertText(capitalizedWords.join(" "));
    setStateGroup({ statusCopy: "converted" });
  };

  const convertToSentenceCase = () => {
    const sentences = inputText.toLowerCase().split(". ");
    const capitalizedSentences = sentences.map(
      (sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1)
    );
    setConvertText(capitalizedSentences.join(". "));
    setStateGroup({ statusCopy: "converted" });
  };

  const convertToLowercase = () => {
    setConvertText(inputText.toLowerCase());
    setStateGroup({ statusCopy: "converted" });
  };

  const handleClear = () => {
    setInputText("");
    setConvertText("");
  };

  const copyClipboard = () => {
    navigator.clipboard
      .writeText(convertText)
      .then(() => {
        setStateGroup({ statusCopy: "success" });
        setTimeout(() => {
          setStateGroup({ statusCopy: "waiting" });
        }, 1500);
      })
      .catch((err) => {
        console.error("Gagal menyalin teks ke clipboard", err);
      });
  };

  return (
    <div className="container mx-auto h-screen px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Konversi Kepekaan Kapital | Convert Case
        </h1>
        <p className="text-center text-xs">
          Buat pilihan kepekaan kalimat dengan sekali klik
        </p>
      </div>

      <div>
        <h2>Masukkan kalimat dibawah</h2>
        <div>
          <textarea
            value={inputText}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Contoh : UPPERCASE ADALAH SEPERTI INI. Capitalize Hanya Kapital Di Awal Saja. Sentence case hanya kapital pada awal kalimat saja. dan lowercase semua teks menjadi kecil."
            className="h-[150px] w-full md:h-[170px] p-2 border border-slate-800 rounded-md"
          />
        </div>
        <div className="mt-2 flex gap-2 flex-wrap">
          <button
            className={`bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-5 py-[7px] rounded-md `}
            onClick={convertToUppercase}
          >
            UPPER CASE
          </button>

          <button
            className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-5 py-[7px] rounded-md"
            onClick={convertToCapitalize}
          >
            Capitalize Case
          </button>
          <button
            className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-5 py-[7px] rounded-md"
            onClick={convertToSentenceCase}
          >
            Sentence case
          </button>
          <button
            className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-5 py-[7px] rounded-md"
            onClick={convertToLowercase}
          >
            lower case
          </button>

          <button
            className="border border-slate-800 px-5 py-[7px] rounded-md"
            onClick={handleClear}
          >
            Hapus
          </button>
        </div>
        {/* ${stateGroup.statusCopy != "converted" && "opacity-40"} */}
        <div className="mt-7 flex flex-wrap gap-2 items-center">
          <h2>Hasil Konversi Kalimat</h2>
          <button
            onClick={copyClipboard}
            className={`px-3 bg-slate-800 rounded-md text-white  ${
              stateGroup.statusCopy != "converted" && "opacity-40"
            }`}
            disabled={stateGroup.statusCopy != "converted" && true}
          >
            {stateGroup?.statusCopy == "success" ? "success" : "copy"}
          </button>
          <textarea
            readOnly
            value={convertText}
            className="w-full md:h-[100px] p-2 border border-slate-800 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

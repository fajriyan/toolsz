"use client";

import React, { useState } from "react";

export default function MinifyCssPage() {
  const [inputText, setInputText] = useState("");
  const [convertText, setConvertText] = useState("");
  const [stateGroup, setStateGroup] = useState({
    statusCopy: "none",
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
     setStateGroup({ statusCopy: "none" });
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
           Convert Case | SEO Tools
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
            className={`bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-5 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800`}
            onClick={convertToUppercase}
          >
            UPPER CASE
          </button>
          <button
            className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-5 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
            onClick={convertToCapitalize}
          >
            Capitalize Case
          </button>
          <button
            className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-5 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
            onClick={convertToSentenceCase}
          >
            Sentence case
          </button>
          <button
            className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-5 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800"
            onClick={convertToLowercase}
          >
            lower case
          </button>

          <button
            className="border border-slate-800 px-5 py-[7px] rounded-md hover:bg-slate-100 focus:ring-2 ring-offset-2 ring-slate-800 "
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
            className={`px-3rounded-md text-white  ${
              (stateGroup.statusCopy == "none" && "opacity-0") ||
              (stateGroup.statusCopy == "waiting" && "opacity-0") ||
              (stateGroup.statusCopy == "converted" && "opacity-100")
            }`}
            disabled={stateGroup.statusCopy != "converted" && true}
          >
            {stateGroup?.statusCopy == "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-clipboard-check fill-green-800"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"
                />
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="bi bi-clipboard-check fill-black"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                />
              </svg>
            )}
          </button>
          <textarea
            readOnly
            placeholder="..."
            value={convertText}
            className="w-full md:h-[100px] p-2 border border-slate-800 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

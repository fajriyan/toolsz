"use client";
import React, { useEffect, useState } from "react";

const WordCounter = () => {
  const [styleAlign, setStyleAlign] = useState("text-left");
  const [density, setDensity] = useState(0);
  const [excludedWords, setExcludedWords] = useState("");
  const [excludedWordArray, setExcludedWordArray] = useState([]);
  const [text, setText] = useState(
    "Ini adalah contoh kalimat yang berulang, silakan ubah sesuai kebutuhan Anda, jangan khawatir kami tidak mengambil apa pun disini : Alat penghitung kata online adalah aplikasi web yang memungkinkan pengguna untuk menghitung jumlah kata dalam sebuah teks atau dokumen. Dengan menggunakan alat ini, pengguna dapat dengan cepat dan mudah menentukan jumlah kata dalam tulisan mereka, baik itu untuk keperluan akademis, profesional, atau pribadi. Alat ini sering kali dilengkapi dengan fitur tambahan seperti menghitung jumlah karakter, paragraf, dan kalimat. Pengguna hanya perlu menyalin dan menempelkan teks mereka ke dalam alat tersebut, dan hasilnya akan ditampilkan secara instan. Alat ini sangat berguna bagi penulis, editor, mahasiswa, dan siapa pun yang membutuhkan analisis teks yang cepat. "
  );

  useEffect(() => {
    setExcludedWordArray(excludedWords.split(" "));
  }, [excludedWords]);

  const punctuation = /[\.,?!]/g;
  const wordLetters = text.length;
  const pureWords = text
    .toLowerCase()
    .replace(punctuation, "")
    .split(/\s+/)
    .filter((word) => word.trim() !== "")
    .filter((word) => !excludedWordArray.includes(word));

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const paragraphs = text
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");
  const readingTime = text.trim() === "" ? 0 : Math.ceil(wordCount / 200);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleExcludedWordsChange = (e) => {
    setExcludedWords(e.target.value);
  };

  const findDuplicateWords = () => {
    const wordCounts = {};
    pureWords.forEach((word) => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });

    return wordCounts;
  };

  const duplicateWordCounts = findDuplicateWords();

  const calculateDuplicatePercentages = () => {
    const duplicatePercentages = {};

    Object.keys(duplicateWordCounts).forEach((word) => {
      const count = duplicateWordCounts[word];
      const percentage = (count / pureWords.length) * 100;
      duplicatePercentages[word] = percentage;
    });

    // Mengurutkan kata-kata berdasarkan persentase tertinggi ke terendah
    const sortedDuplicatePercentages = Object.keys(duplicatePercentages).sort(
      (a, b) => duplicatePercentages[b] - duplicatePercentages[a]
    );

    return sortedDuplicatePercentages.map((word) => ({
      word,
      percentage: duplicatePercentages[word],
    }));
  };

  const duplicateWordPercentages = calculateDuplicatePercentages();

  return (
    <div className="container mx-auto mb-10 px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Penghitung Kata | Word Counter
        </h1>
        <p className="text-center text-xs">
          Hitung jumlah kata dalam sebuah kalimat
        </p>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-6">
        <div className="w-full md:w-[70%] ">
          <textarea
            onChange={handleChange}
            value={text}
            className={`border h-52 md:h-auto border-slate-700 w-full rounded-md p-2 ${styleAlign}`}
            cols="30"
            rows="23"
          ></textarea>
        </div>
        <div className="w-full md:w-[27%]">
          <div className="border border-slate-700 p-2 rounded-md">
            <div className="border-b border-slate-300 pb-1 font-semibold flex justify-between ">
              Detail:
              <div className="flex gap-2 ">
                <button
                  className={
                    styleAlign === "text-left"
                      ? "border border-slate-700 rounded-sm"
                      : "border border-white"
                  }
                  onClick={() => setStyleAlign("text-left")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                </button>
                <button
                  className={
                    styleAlign === "text-right"
                      ? "border border-slate-700 rounded-sm"
                      : "border border-white"
                  }
                  onClick={() => setStyleAlign("text-right")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                </button>
                <button
                  className={
                    styleAlign === "text-justify"
                      ? "border border-slate-700 rounded-sm"
                      : "border border-white"
                  }
                  onClick={() => setStyleAlign("text-justify")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <p className="flex justify-between border-b py-1">
              Jumlah Huruf: <span>{wordLetters}</span>
            </p>
            <p className="flex justify-between border-b py-1">
              Jumlah Kata: <span>{wordCount}</span>
            </p>
            <p className="flex justify-between border-b py-1">
              Jumlah Paragraf: <span> {paragraphs.length}</span>
            </p>
            <p className="flex justify-between py-1">
              Waktu Membaca: <span> {readingTime} Menit</span>
            </p>
          </div>

          <div className="border border-slate-700 mt-5 p-2 rounded-md">
            <div className="border-b border-slate-300 pb-1 font-semibold">
              Kata-kata yang Berulang:
            </div>
            <ul className="overflow-y-scroll h-[200px] pr-2 scroll-custom">
              {duplicateWordPercentages.map((item) => (
                <li
                  key={item.word}
                  className="flex items-center justify-between border-b py-1 text-sm"
                >
                  {item.word}
                  <span className="border border-slate-700 py-[1px] rounded-xl px-2">
                    {duplicateWordCounts[item.word]} |{" "}
                    {item.percentage.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-700 mt-5 p-2 rounded-md">
            <div className="border-b border-slate-300 pb-1 font-semibold mb-2">
              Pengecualian Kata:
            </div>
            <input
              type="text"
              value={excludedWords}
              onChange={handleExcludedWordsChange}
              className="w-full rounded-md p-2 border border-slate-600"
              placeholder="Tulis Kata, pisahkan dengan spasi"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;

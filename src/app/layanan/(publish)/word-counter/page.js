"use client";
import React, { useEffect, useState } from "react";

const WordCounter = () => {
  const [styleAlign, setStyleAlign] = useState("text-left");
  const [density, setDensity] = useState(0);
  const [excludedWords, setExcludedWords] = useState("");
  const [excludedWordArray, setExcludedWordArray] = useState([]);
  const [text, setText] = useState(
    "Penghitung kata online : Ini adalah contoh kalimat yang berulang, silakan ubah sesuai kebutuhan Anda, jangan khawatir kami tidak mengambil apa pun disini. Alat penghitung kata online adalah aplikasi web yang memungkinkan pengguna untuk menghitung jumlah kata dalam sebuah teks atau dokumen. Dengan menggunakan alat ini, pengguna dapat dengan cepat dan mudah menentukan jumlah kata dalam tulisan mereka, baik itu untuk keperluan akademis, profesional, atau pribadi. Alat ini sering kali dilengkapi dengan fitur tambahan seperti menghitung jumlah karakter, paragraf, dan kalimat. Pengguna hanya perlu menyalin dan menempelkan teks mereka ke dalam alat tersebut, dan hasilnya akan ditampilkan secara instan. Alat ini sangat berguna bagi penulis, editor, mahasiswa, dan siapa pun yang membutuhkan analisis teks yang cepat. "
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
          Penghitung Kata Online | SEO Tools
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
              <div className="flex items-center gap-2">
              <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-body-text" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
              </svg></i>
              Detail Kalimat:
              </div>
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
                      fillRule="evenodd"
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
                      fillRule="evenodd"
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
                      fillRule="evenodd"
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
            <div className="border-b border-slate-300 pb-1 font-semibold flex gap-2 items-center">
              <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bricks" viewBox="0 0 16 16">
                <path d="M0 .5A.5.5 0 0 1 .5 0h15a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H14v2h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H14v2h1.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5H2v-2H.5a.5.5 0 0 1-.5-.5v-3A.5.5 0 0 1 .5 6H2V4H.5a.5.5 0 0 1-.5-.5zM3 4v2h4.5V4zm5.5 0v2H13V4zM3 10v2h4.5v-2zm5.5 0v2H13v-2zM1 1v2h3.5V1zm4.5 0v2h5V1zm6 0v2H15V1zM1 7v2h3.5V7zm4.5 0v2h5V7zm6 0v2H15V7zM1 13v2h3.5v-2zm4.5 0v2h5v-2zm6 0v2H15v-2z"/>
              </svg></i> 
              Kata yang Berulang:
            </div>
            <ul className="overflow-y-scroll h-[200px] pr-2 scroll-custom">
              {duplicateWordPercentages.map((item) => (
                <li
                  key={item.word}
                  className="flex items-center justify-between border-b py-1 text-sm"
                >
                  {item.word}
                  <span className="border border-slate-700 py-[1px] rounded-md pl-1 pr-2">
                    <span className="bg-slate-800 text-white px-2 rounded-sm font-semibold">{duplicateWordCounts[item.word]}</span>
                    {" "}
                    {item.percentage.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-700 mt-5 p-2 rounded-md">
            <div className="border-b border-slate-300 pb-1 font-semibold mb-2 flex items-center gap-2">
              <i>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-input-cursor-text" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.17 4.17 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.5 3.5 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.17 4.17 0 0 1-2.06-.566A5 5 0 0 1 8 13.65a5 5 0 0 1-.44.285 4.17 4.17 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.5 3.5 0 0 0-.436-.294A3.17 3.17 0 0 0 5.5 2.5.5.5 0 0 1 5 2"/>
                <path d="M10 5h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4v1h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4zM6 5V4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>
              </svg>
              </i>
              Pengecualian Kata:
            </div>
            <input
              type="text"
              value={excludedWords}
              onChange={handleExcludedWordsChange}
              className="w-full rounded-md p-2 border border-slate-600"
              placeholder="Pilih Kata, pisahkan dengan spasi"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;

"use client";
import React, { useEffect, useRef, useState } from "react";

const WordCounter = () => {
  const [styleAlign, setStyleAlign] = useState("text-left");
  const [showHighlight, setShowHighlight] = useState(false);
  const [excludedWords, setExcludedWords] = useState("");
  const [excludedWordArray, setExcludedWordArray] = useState([]);
  const [text, setText] = useState(
    "Penghitung kata online : Ini adalah contoh kalimat yang berulang, silakan ubah sesuai kebutuhan Anda, jangan khawatir kami tidak mengambil apa pun disini. Alat penghitung kata online adalah aplikasi web yang memungkinkan pengguna untuk menghitung jumlah kata dalam sebuah teks atau dokumen. Dengan menggunakan alat ini, pengguna dapat dengan cepat dan mudah menentukan jumlah kata dalam tulisan mereka, baik itu untuk keperluan akademis, profesional, atau pribadi. Alat ini sering kali dilengkapi dengan fitur tambahan seperti menghitung jumlah karakter, paragraf, dan kalimat. Pengguna hanya perlu menyalin dan menempelkan teks mereka ke dalam alat tersebut, dan hasilnya akan ditampilkan secara instan. Alat ini sangat berguna bagi penulis, editor, mahasiswa, dan siapa pun yang membutuhkan analisis teks yang cepat. "
  );
  const [activeTab, setActiveTab] = useState(1); // 1 kata default

  // Refs untuk sync scroll
  const highlightRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setExcludedWordArray(excludedWords.split(" ").filter(Boolean));
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
  const handleExcludedWordsChange = (e) => setExcludedWords(e.target.value);

  // escape html untuk mencegah XSS / tag HTML bermasalah
  const escapeHtml = (unsafe) =>
    unsafe
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  // Fungsi untuk cari kata / frasa berulang
  const findDuplicatePhrases = (n = 1) => {
    const phrases = {};
    for (let i = 0; i <= pureWords.length - n; i++) {
      const phrase = pureWords.slice(i, i + n).join(" ");
      phrases[phrase] = (phrases[phrase] || 0) + 1;
    }

    // filter hanya yg muncul lebih dari 1x
    const filtered = Object.entries(phrases)
      .filter(([_, count]) => count > 1)
      .map(([word, count]) => ({
        word,
        count,
        percentage: (count / pureWords.length) * 100,
      }))
      .sort((a, b) => b.count - a.count);

    return filtered;
  };

  // Data sesuai tab
  const duplicateData = findDuplicatePhrases(activeTab);

  const getHighlightedText = (textContent, n, duplicates) => {
    if (!textContent) return "";

    const highlightSet = new Set(duplicates.map((d) => d.word));
    const tokens = textContent.split(/(\s+)/); // preserve whitespace as tokens
    const punctuationLocal = /[\.,?!]/g;

    // indeks token yang berisi kata (bukan whitespace)
    const wordTokenIndexes = [];
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].trim() !== "") {
        wordTokenIndexes.push(i);
      }
    }

    // array untuk mark status
    const marked = new Array(tokens.length).fill(false);

    for (let wi = 0; wi <= wordTokenIndexes.length - n; wi++) {
      const startTokenIdx = wordTokenIndexes[wi];
      const endTokenIdx = wordTokenIndexes[wi + n - 1];

      // Ambil N kata (bukan whitespace), normalize
      const phraseWords = wordTokenIndexes
        .slice(wi, wi + n)
        .map((idx) =>
          tokens[idx].toLowerCase().replace(punctuationLocal, "").trim()
        )
        .filter(Boolean);

      const normalized = phraseWords.join(" ");

      if (highlightSet.has(normalized)) {
        // Cek overlap
        let overlap = false;
        for (let k = startTokenIdx; k <= endTokenIdx; k++) {
          if (marked[k]) {
            overlap = true;
            break;
          }
        }
        if (overlap) continue;

        // Wrap seluruh kata dalam range
        for (let k = startTokenIdx; k <= endTokenIdx; k++) {
          tokens[k] = `<mark class="bg-yellow-200 text-black">${escapeHtml(
            tokens[k]
          )}</mark>`;
          marked[k] = true;
        }
      }
    }

    // Escape token sisanya
    for (let i = 0; i < tokens.length; i++) {
      if (!tokens[i].startsWith("<mark")) {
        tokens[i] = escapeHtml(tokens[i]);
      }
    }

    return tokens.join("");
  };

  // Sync scroll: saat textarea discroll, highlight ikut; juga sinkronisasi saat teks/activeTab berubah
  useEffect(() => {
    const ta = textareaRef.current;
    const hl = highlightRef.current;
    if (!ta || !hl) return;

    const onScroll = () => {
      hl.scrollTop = ta.scrollTop;
      hl.scrollLeft = ta.scrollLeft;
    };

    ta.addEventListener("scroll", onScroll);
    // sync initial
    hl.scrollTop = ta.scrollTop;
    hl.scrollLeft = ta.scrollLeft;

    return () => {
      ta.removeEventListener("scroll", onScroll);
    };
  }, []);

  // juga update highlight scroll pos ketika konten atau tab berubah (agar tidak mismatch)
  useEffect(() => {
    const ta = textareaRef.current;
    const hl = highlightRef.current;
    if (ta && hl) {
      hl.scrollTop = ta.scrollTop;
      hl.scrollLeft = ta.scrollLeft;
    }
  }, [text, activeTab, duplicateData]);

  return (
    <div className="container mx-auto mb-10 px-3 md:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Keyword Density Online | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Hitung jumlah kata dalam sebuah kalimat online
        </p>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-6 w-full">
        <div className="w-full lg:w-[70%]">
          {/* Container absolute overlay + textarea */}
          <div className="relative w-full h-52 md:h-full border border-slate-700 rounded-md">
            {/* Highlight layer */}
            {showHighlight && (
              <div
                ref={highlightRef}
                className={`absolute inset-0 whitespace-pre-wrap p-2 overflow-auto ${styleAlign} text-transparent`}
                style={{
                  // text-transparent untuk menyembunyikan teks biasa; <mark> punya text-black jadi akan terlihat
                  // pastikan font/line-height/padding sama dengan textarea
                  whiteSpace: "pre-wrap",
                  pointerEvents: "none",
                }}
                dangerouslySetInnerHTML={{
                  __html: getHighlightedText(text, activeTab, duplicateData),
                }}
              />
            )}

            {/* Textarea layer */}
            <textarea
              ref={textareaRef}
              onChange={handleChange}
              value={text}
              className={`absolute inset-0 resize-none w-full h-full p-2 bg-transparent text-black ${styleAlign} overflow-auto`}
              cols="30"
              rows="23"
              // onScroll handled in useEffect via addEventListener on ref
            />
          </div>
        </div>

        <div className="w-full lg:w-[27%]">
          {/* Detail Kalimat */}

          <div className="border border-slate-700 p-2 rounded-md">
            <div className="border-b border-slate-300 pb-1 font-semibold flex justify-between ">
              <span>Detail Kalimat:</span>
            </div>
            <p className="flex justify-between border-b py-1">
              Jumlah Huruf: <span>{wordLetters}</span>
            </p>
            <p className="flex justify-between border-b py-1">
              Jumlah Kata: <span>{wordCount}</span>
            </p>
            <p className="flex justify-between border-b py-1">
              Jumlah Paragraf: <span>{paragraphs.length}</span>
            </p>
            <p className="flex justify-between py-1">
              Waktu Membaca: <span>{readingTime} Menit</span>
            </p>
          </div>

          {/* Kata yang Berulang */}
          <div className="border border-slate-700 mt-5 p-2 rounded-md">
            <div className="border-b border-slate-300 pb-1 font-semibold mb-2">
              Kata yang Berulang:
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-3 overflow-x-auto">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setActiveTab(n)}
                  className={`px-3 min-w-max py-1 text-xs rounded ${
                    activeTab === n
                      ? "bg-slate-800 text-white"
                      : "bg-slate-200 text-black"
                  }`}
                >
                  {n} Kata
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3 text-xs">
              <input
                id="highlight-toggle"
                type="checkbox"
                checked={showHighlight}
                onChange={() => setShowHighlight(!showHighlight)}
                className="w-4 h-4"
              />
              <label htmlFor="highlight-toggle">Tampilkan Highlight</label>
            </div>

            <ul className="overflow-y-scroll h-[200px] pr-2 scroll-custom">
              {duplicateData.length === 0 ? (
                <li className="text-sm text-gray-500">
                  Tidak ada {activeTab}-kata berulang
                </li>
              ) : (
                duplicateData.map((item) => (
                  <li
                    key={item.word}
                    className="flex items-center justify-between border-b py-1 text-sm"
                  >
                    {item.word}
                    <span className="border border-slate-700 py-[1px] rounded-md pl-1 pr-2">
                      <span className="bg-slate-800 text-white px-2 rounded-sm font-semibold">
                        {item.count}
                      </span>{" "}
                      {item.percentage.toFixed(2)}%
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Pengecualian */}
          <div className="border border-slate-700 mt-5 p-2 rounded-md">
            <div className="border-b border-slate-300 pb-1 font-semibold mb-2">
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

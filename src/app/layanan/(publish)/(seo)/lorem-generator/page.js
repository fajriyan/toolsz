"use client";
import React, { useEffect, useRef, useState } from "react";

const LoremGenerator = () => {
  const [paragraphs, setParagraphs] = useState(1);
  const [words, setWords] = useState(20);
  const [shuffleWords, setShuffleWords] = useState(false);
  const [generatedLorem, setGeneratedLorem] = useState("");
  const [resGenerate, setGenerate] = useState(false);
  const [resCopy, setResCopy] = useState(false);

  const loremSentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum jri.",
    "Nostra habitant ad suscipit porttitor ad libero malesuada, sit orci pulvinar scelerisque. ",
    "Dignissim odio pulvinar maximus aptent phasellus turpis condimentum nullam, nisl vulputate ligula praesent.",
  ];

  const generateLoremIpsum = () => {
    const paragraphArray = [];
    for (let i = 0; i < paragraphs; i++) {
      const sentencesArray = [];
      for (let j = 0; j < words; j++) {
        let sentence =
          loremSentences[Math.floor(Math.random() * loremSentences.length)];
        if (shuffleWords) {
          sentence = sentence
            .split(" ")
            .sort(() => 0.5 - Math.random())
            .join(" ");
        }
        sentencesArray.push(sentence);
      }
      paragraphArray.push(sentencesArray.join(" "));
      setGenerate(true);
      setTimeout(() => {
        setGenerate(false);
      }, 1000);
    }

    setGeneratedLorem(paragraphArray.join("\n"));
  };

  const interactionCopy = () => {
    setResCopy(true);
    setTimeout(() => {
      setResCopy(false);
    }, 3000); // Menutup toast setelah 3 detik
  };

  const copyClipboard = () => {
    navigator.clipboard
      .writeText(generatedLorem)
      .then(() => {
        interactionCopy();
      })
      .catch((err) => {
        console.error("Gagal menyalin teks ke clipboard", err);
      });
  };

  useEffect(() => {
    generateLoremIpsum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, paragraphs]);

  return (
    <div className="container mx-auto mb-10 px-3 md:px-0 min-h-[80dvh]">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Lorem Ipsum Generator | SEO Tools
        </h1>
        <p className="text-center text-xs">
          Hasilkan Kalimat &quot;Lorem&quot; dengan Mudah
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Control Start  */}
        <div className="border w-full md:w-[20%] border-slate-800 p-3 rounded-md">
          <div className="">
            <div className="flex gap-2 items-center md:flex-col md:items-start md:gap-1">
              <label htmlFor="paragraphs">Paragraf:</label>
              <input
                type="number"
                id="paragraphs"
                className="border border-slate-700 p-1 rounded-md"
                value={paragraphs}
                onChange={(e) => setParagraphs(e.target.value)}
              />
            </div>

            <div className="flex gap-2 items-center md:flex-col md:items-start md:gap-1">
              <label htmlFor="words">Kalimat per Paragraf:</label>
              <input
                type="number"
                id="words"
                className="border border-slate-700 p-1 rounded-md"
                value={words}
                onChange={(e) => setWords(e.target.value)}
              />
            </div>
            <div className="">
              <button
                className="mt-3 w-full py-2 rounded-md bg-slate-700 hover:bg-slate-900 text-white flex gap-2 justify-center items-center"
                onClick={generateLoremIpsum}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={resGenerate ? "animate-spin" : ""}
                  viewBox="0 0 16 16"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                  <path
                    fillRule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  />
                </svg>
                Regenerate
              </button>
              <button
                className={
                  resCopy
                    ? "mt-2 w-full py-1 rounded-md font-medium border border-emerald-400 bg-emerald-400 "
                    : "mt-2 w-full py-1 rounded-md border border-slate-700 hover:bg-slate-700 hover:text-white"
                }
                onClick={copyClipboard}
              >
                {resCopy ? (
                  <div className="flex gap-2 justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      fill="currentColor"
                      className="bi bi-check-lg"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                      />
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                    <span>Copy Berhasil</span>
                  </div>
                ) : (
                  <span>Copy to Clipboard</span>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Control End */}
        <div className="w-full md:w-[79%] border border-slate-800 p-2 rounded-md ">
          <p className="h-[450px] overflow-y-scroll scroll-custom whitespace-pre-wrap pr-2 text-justify">
            {generatedLorem}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoremGenerator;

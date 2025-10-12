"use client";

import { useState } from "react";
import bcrypt from "bcryptjs";

export default function BcryptPage() {
  const [textToHash, setTextToHash] = useState("");
  const [rounds, setRounds] = useState(12);
  const [generatedHash, setGeneratedHash] = useState("");

  const [hashToVerify, setHashToVerify] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  const generateHash = () => {
    if (!textToHash) return; // extra safety
    const salt = bcrypt.genSaltSync(rounds);
    const hash = bcrypt.hashSync(textToHash, salt);
    setGeneratedHash(hash);
  };

  const verifyHash = () => {
    if (!hashToVerify || !originalText) return; // extra safety
    const result = bcrypt.compareSync(originalText, hashToVerify);
    setVerifyResult(result);
  };

  const increaseRounds = () => setRounds((r) => Math.min(r + 1, 20));
  const decreaseRounds = () => setRounds((r) => Math.max(r - 1, 4));

  const isGenerateDisabled = textToHash.trim() === "";
  const isVerifyDisabled =
    hashToVerify.trim() === "" || originalText.trim() === "";

  return (
    <div className="min-h-screen bg-white flex flex-col gap-10 container mx-auto px-5 lg:px-0">
      <div className="py-5">
        <h1 className="text-xl text-center font-semibold">
          Bcrypt Hash Generator | Developer Tools
        </h1>
        <p className="text-center text-xs mt-1">
          Hasilkan hash bcrypt dengan mudah dan verifikasi keasliannya.
        </p>
      </div>
      <div className="flex flex-col gap-8 md:w-[80%] xl:w-[50%] mx-auto pb-10">
        {/* Generate Hash */}
        <div className="bg-white p-4 rounded border border-slate-700 w-full">
          <h2 className="text-xl font-bold mb-2">Generate Hash</h2>
          <p className="mb-4 text-gray-600 text-sm">
            Buat hash bcrypt dari teks Anda. Semakin tinggi jumlah ronde,
            semakin aman hash, tetapi prosesnya akan lebih lama.
          </p>

          <label className="block mb-2 font-medium">Text to Hash</label>
          <input
            type="text"
            value={textToHash}
            onChange={(e) => setTextToHash(e.target.value)}
            placeholder="Enter text to hash"
            className="border p-2 rounded w-full mb-4"
          />

          <div className="">
            <label className="block mb-2 font-medium text-slate-600 text-xs">
              Rounds (Cost Factor) :
            </label>
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={decreaseRounds}
                className="bg-gray-300 w-7 h-7 rounded-full flex justify-center items-center hover:bg-gray-400"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14"
                  />
                </svg>
              </button>
              <div className="bg-gray-300 w-7 h-7 rounded-full flex text-sm font-medium justify-center items-center">
                {rounds}
              </div>
              <button
                onClick={increaseRounds}
                className="bg-gray-300 w-7 h-7 rounded-full flex justify-center items-center hover:bg-gray-400"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            onClick={generateHash}
            disabled={isGenerateDisabled}
            className={`flex font-medium text-white px-3 py-[7px] min-w-max rounded-lg gap-1 items-center ${
              isGenerateDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-800 to-slate-900 hover:from-gray-900 hover:to-slate-800"
            }`}
          >
            Generate Hash
          </button>

          {generatedHash && (
            <div className="mt-4 p-2 bg-gray-100 rounded break-all flex items-center justify-between">
              <div className="break-words w-[85%]">
                <strong>Hash:</strong> <br /> {generatedHash}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(generatedHash)}
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
              >
                Copy
              </button>
            </div>
          )}
        </div>

        {/* Verify Hash */}
        <div className="bg-white p-4 rounded border border-slate-700 w-full">
          <h2 className="text-xl font-bold mb-2">Verify Hash</h2>
          <p className="mb-4 text-gray-600 text-sm">
            Periksa apakah hash bcrypt cocok dengan teks asli.
          </p>

          <label className="block mb-2 font-medium">Bcrypt Hash</label>
          <input
            type="text"
            value={hashToVerify}
            onChange={(e) => setHashToVerify(e.target.value)}
            placeholder="Paste the bcrypt hash"
            className="border p-2 rounded w-full mb-4"
          />

          <label className="block mb-2 font-medium">Original Text</label>
          <input
            type="text"
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Enter the original text"
            className="border p-2 rounded w-full mb-4"
          />

          <button
            onClick={verifyHash}
            disabled={isVerifyDisabled}
            className={`flex font-medium text-white px-3 py-[7px] min-w-max rounded-lg gap-1 items-center ${
              isVerifyDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-800 to-slate-900 hover:from-gray-900 hover:to-slate-800"
            }`}
          >
            Verify Hash
          </button>

          {verifyResult !== null && (
            <div
              className={`mt-4 p-2 rounded ${
                verifyResult
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {verifyResult ? "✅ Hash Cocok!" : "❌ Hash Tidak Cocok"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

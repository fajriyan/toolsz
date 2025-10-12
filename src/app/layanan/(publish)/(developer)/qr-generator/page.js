"use client";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";

const QRCodeGenerator = () => {
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [error, setError] = useState("");

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    setInputValue("");
    setError("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setError("");
  };

  const validateInput = () => {
    if (inputType === "url" && !inputValue.match(/^https?:\/\/.+/)) {
      setError("Format URL salah, mulai dengan http:// or https://");
      return false;
    }
    if (
      inputType === "email" &&
      !inputValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ) {
      setError("Format Email salah, silahkan perbaiki");
      return false;
    }
    return true;
  };

  const generateQRCode = () => {
    if (!validateInput()) return "";

    switch (inputType) {
      case "url":
        return inputValue;
      case "email":
        return `mailto:${inputValue}`;
      default:
        return inputValue;
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <div className="container mx-auto min-h-[83vh] z-0 px-3 md:px-0">
        <div className="py-5 mb-10">
          <h1 className="text-xl text-center font-semibold">
            QR Code Generator | Developer Tools
          </h1>
          <p className="text-center text-xs">
            Hasilkan QR Code dengan Praktis dan Cepat
          </p>
        </div>
        <div className="md:w-[80%] xl:w-[50%] mx-auto min-h-[67dvh]">
          <div className="w-full">
            <div className="flex gap-3 w-full">
              <input
                type="text"
                className="w-full border border-slate-700 p-2 rounded-md"
                placeholder={`Enter ${inputType}`}
                value={inputValue}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-xs mt-1 text-red-600">{error}</p>}

            <div className="mt-5 flex justify-start gap-5">
              <select
                className="min-w-[50%] sm:min-w-[30%] border border-slate-700 rounded-md"
                onChange={handleTypeChange}
                value={inputType}
              >
                <option value="text">Text</option>
                <option value="url">URL</option>
                <option value="email">Email</option>
              </select>
              <div className="min-w-[50%] sm:min-w-[30%]">
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="color"
                    value={qrColor}
                    className="rounded-md h-8 w-8 border-2 border-gray-300 cursor-pointer"
                    onChange={(e) => setQrColor(e.target.value)}
                    title="Choose QR Code color"
                  />
                  <span className="text-sm text-gray-700">
                    {qrColor.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 w-full flex flex-col items-center justify-center border border-slate-500 p-5 rounded-lg">
            {inputValue && !error ? (
              <>
                <QRCodeCanvas
                  value={generateQRCode()}
                  size={250}
                  fgColor={qrColor}
                />
                <div className="mt-5">
                  <button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-gray-800 to-slate-900 hover:from-slate-950 hover:to-black text-white px-3 py-[7px] rounded-md focus:ring-2 ring-offset-2 ring-slate-800 flex gap-2 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-download"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                    Download
                  </button>
                </div>
              </>
            ) : (
              <Image
                className="opacity-60 animate-pulse"
                src="/assets/images/placolder-qr.png"
                alt="hero Image"
                width={250}
                height={250}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;

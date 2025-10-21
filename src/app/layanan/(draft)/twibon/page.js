"use client";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [twibbon, setTwibbon] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  // posisi dan zoom foto
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const canvasSize = 500;

  // --- DRAW FUNCTION ---
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvasSize, canvasSize);

    if (photo) {
      const img = new Image();
      img.src = photo;
      img.onload = () => {
        const width = img.width * scale;
        const height = img.height * scale;
        const x = position.x + canvasSize / 2 - width / 2;
        const y = position.y + canvasSize / 2 - height / 2;
        ctx.drawImage(img, x, y, width, height);

        if (twibbon) {
          const overlay = new Image();
          overlay.src = twibbon;
          overlay.onload = () => {
            ctx.drawImage(overlay, 0, 0, canvasSize, canvasSize);
          };
        }
      };
    }
  };

  useEffect(() => {
    draw();
  }, [photo, twibbon, position, scale]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleTwibbon = (e) => {
    const file = e.target.files[0];
    if (file) setTwibbon(URL.createObjectURL(file));
  };

  // --- Drag & Move ---
  const handleMouseDown = (e) => {
    setDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => setDragging(false);
  const handleMouseMove = (e) => {
    if (!dragging) return;
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  // --- Zoom ---
  const zoomIn = () => setScale((s) => s + 0.1);
  const zoomOut = () => setScale((s) => (s - 0.1 <= 0 ? 0.01 : s - 0.1));

  // --- Auto Fit ---
  const autoFit = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // --- Gabungkan dan Download ---
  const combineAndDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "twibbon-result.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setResultUrl(canvas.toDataURL("image/png"));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">
        Pasang Twibbon Interaktif
      </h1>

      {/* Upload */}
      <div className="flex flex-col gap-3">
        <label className="flex flex-col text-sm font-medium">
          Pilih Foto:
          <input type="file" accept="image/*" onChange={handlePhoto} />
        </label>

        <label className="flex flex-col text-sm font-medium">
          Pilih Twibbon (PNG Transparan):
          <input type="file" accept="image/png" onChange={handleTwibbon} />
        </label>
      </div>

      {/* Canvas Area */}
      <div
        className="border rounded-lg bg-white shadow relative select-none"
        style={{ width: canvasSize, height: canvasSize }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          className="w-full h-full cursor-move"
        ></canvas>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-2">
        <button
          onClick={zoomOut}
          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
        >
          -
        </button>
        <button
          onClick={zoomIn}
          className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={autoFit}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Auto Fit
        </button>
        <button
          onClick={combineAndDownload}
          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
        >
          Download
        </button>
      </div>

      {/* Hasil */}
      {resultUrl && (
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="font-medium text-gray-700">Hasil Akhir:</p>
          <img
            src={resultUrl}
            alt="Hasil Twibbon"
            className="w-64 h-64 border rounded shadow"
          />
        </div>
      )}
    </main>
  );
}

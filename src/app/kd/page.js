"use client";
// import React, { useState } from "react";

// function KeywordDensityCalculator() {
//   const [text, setText] = useState("");
//   const [keyword, setKeyword] = useState("");
//   const [density, setDensity] = useState(0);

//   const calculateDensity = () => {
//     const words = text.split(/\s+/);
//     const keywordOccurrences = words.filter(
//       (word) => word.toLowerCase() === keyword.toLowerCase()
//     ).length;
//     const totalWords = words.length;
//     const keywordDensity = (keywordOccurrences / totalWords) * 100;
//     setDensity(keywordDensity.toFixed(2));
//   };

//   return (
//     <div>
//       <textarea
//         placeholder="Masukkan teks di sini"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Kata kunci"
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//       />
//       <button onClick={calculateDensity}>Hitung Kepadatan Kata Kunci</button>
//       <p>Kepadatan Kata Kunci: {density}%</p>
//     </div>
//   );
// }

// export default KeywordDensityCalculator;

// Option 2 ////////////////////////////////////////////////////////

// import React, { useState } from "react";

// function KeywordDensityCalculator() {
//   const [text, setText] = useState("");
//   const [wordCounts, setWordCounts] = useState({});
//   const [density, setDensity] = useState(0);

//   const calculateDensity = () => {
//     if (!text) {
//       alert("Masukkan teks terlebih dahulu.");
//       return;
//     }

//     const words = text.toLowerCase().split(/\s+/);
//     const totalWords = words.length;

//     // Hitung jumlah kemunculan setiap kata
//     const counts = {};
//     words.forEach((word) => {
//       counts[word] = (counts[word] || 0) + 1;
//     });

//     // Hitung kepadatan kata berulang dalam persentase
//     const densityPercentage = (Object.keys(counts).length / totalWords) * 100;
//     setDensity(densityPercentage.toFixed(2));
//     setWordCounts(counts);
//   };

//   return (
//     <div>
//       <textarea
//         placeholder="Masukkan teks di sini"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <button onClick={calculateDensity}>Hitung Kepadatan Kata Berulang</button>
//       <p>Kepadatan Kata Berulang dalam Persentase: {density}%</p>
//       <p>Kemunculan Kata:</p>
//       <ul>
//         {Object.entries(wordCounts).map(([word, count]) => (
//           <li key={word}>
//             {word}: {count} kali
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default KeywordDensityCalculator;

import React, { useState, useEffect } from "react";

function KeywordDensityCalculator() {
  const [text, setText] = useState("");
  const [wordCounts, setWordCounts] = useState({});
  const [density, setDensity] = useState(0);

  useEffect(() => {
    if (!text) {
      setDensity(0);
      setWordCounts({});
      return;
    }

    const words = text.toLowerCase().split(/\s+/);
    const totalWords = words.length;

    // Hitung jumlah kemunculan setiap kata
    const counts = {};
    words.forEach((word) => {
      counts[word] = (counts[word] || 0) + 1;
    });

    // Hitung kepadatan kata berulang dalam persentase
    const densityPercentage = (Object.keys(counts).length / totalWords) * 100;
    setDensity(densityPercentage.toFixed(2));
    setWordCounts(counts);
  }, [text]);

  return (
    <div>
      <textarea
        placeholder="Masukkan teks di sini"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>Kepadatan Kata Berulang dalam Persentase: {density}%</p>
      <p>Kemunculan Kata:</p>
      <ul>
        {Object.entries(wordCounts).map(([word, count]) => (
          <li key={word}>
            {word}: {count} kali
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordDensityCalculator;

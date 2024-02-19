"use client";

import React, { useState } from "react";

const HashComponent = () => {
  const [inputText, setInputText] = useState("");
  const [md5Hash, setMd5Hash] = useState("");
  const [sha1Hash, setSha1Hash] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const calculateMD5 = (str) => {
    let hash = 0;
    if (str.length === 0) return hash;

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return hash.toString(16);
  };

  const calculateSHA1 = (str) => {
    let hash = 0;
    if (str.length === 0) return hash;

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
    }

    return hash.toString(16);
  };

  const handleEncrypt = () => {
    const md5HashedText = calculateMD5(inputText);
    setMd5Hash(md5HashedText);

    const sha1HashedText = calculateSHA1(inputText);
    setSha1Hash(sha1HashedText);
  };

  return (
    <div>
      <h2>MD5 and SHA-1 Hashing</h2>
      <label>
        Input Text:
        <input type="text" value={inputText} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleEncrypt}>Hash</button>
      <br />
      <div>
        <strong>MD5 Hash:</strong> {md5Hash}
      </div>
      <div>
        <strong>SHA-1 Hash:</strong> {sha1Hash}
      </div>
    </div>
  );
};

export default HashComponent;

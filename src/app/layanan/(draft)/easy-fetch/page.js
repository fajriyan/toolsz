"use client";
import { useState } from "react";

export default function EasyFetch() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [authType, setAuthType] = useState("none");
  const [token, setToken] = useState("");
  const [body, setBody] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);

  const handleHeaderChange = (index, field, value) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  };

  const addHeader = () => setHeaders([...headers, { key: "", value: "" }]);
  const removeHeader = (index) =>
    setHeaders(headers.filter((_, i) => i !== index));

  const generateHeadersObject = () => {
    let obj = {};
    headers.forEach((h) => {
      if (h.key && h.value) obj[h.key] = h.value;
    });
    if (authType === "bearer" && token) {
      obj["Authorization"] = `Bearer ${token}`;
    }
    return obj;
  };

  const generateCode = () => {
    const headersObj = generateHeadersObject();
    const hasBody = ["POST", "PUT", "PATCH"].includes(method.toUpperCase());
    const headersCode = Object.keys(headersObj).length
      ? `headers: ${JSON.stringify(headersObj, null, 2)},`
      : "";
    const bodyCode =
      hasBody && body
        ? `body: JSON.stringify(${
            body.trim().startsWith("{") ? body : `{ ${body} }`
          }),`
        : "";

    return `
import { useEffect, useState } from "react";

export default function MyFetchExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("${url}", {
      method: "${method}",
      ${headersCode}
      ${bodyCode}
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
    `.trim();
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!url) {
      alert("Masukkan URL API terlebih dahulu!");
      return;
    }
    const generated = generateCode();
    setCode(generated);
    setShowCode(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Kode berhasil disalin!");
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 text-gray-800">
      <h1 className="text-2xl font-bold text-center">
        ⚡ Easy Fetch Playground
      </h1>
      <p className="text-center text-sm text-gray-500">
        Mini Postman versi mudah untuk belajar Fetch API React
      </p>

      <form
        onSubmit={handleGenerate}
        className="bg-white border rounded-lg shadow p-5 space-y-6"
      >
        {/* URL & Method */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">🔗 URL API</label>
          <input
            type="text"
            placeholder="https://api.example.com/data"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border p-2 rounded text-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold">⚙️ Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border p-2 rounded text-sm"
          >
            {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Auth */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">
            🔐 Authorization
          </label>
          <select
            value={authType}
            onChange={(e) => setAuthType(e.target.value)}
            className="w-full border p-2 rounded text-sm"
          >
            <option value="none">Tidak ada</option>
            <option value="bearer">Bearer Token</option>
            <option value="basic">Basic Auth (belum aktif)</option>
          </select>

          {authType === "bearer" && (
            <input
              type="text"
              placeholder="Masukkan token..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full border p-2 rounded text-sm"
            />
          )}
        </div>

        {/* Headers */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">📦 Headers</label>
          {headers.map((h, i) => (
            <div key={i} className="flex space-x-2 items-center">
              <input
                type="text"
                placeholder="Key (misal: Content-Type)"
                value={h.key}
                onChange={(e) => handleHeaderChange(i, "key", e.target.value)}
                className="w-1/2 border p-2 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Value (misal: application/json)"
                value={h.value}
                onChange={(e) => handleHeaderChange(i, "value", e.target.value)}
                className="w-1/2 border p-2 rounded text-sm"
              />
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => removeHeader(i)}
                  className="text-red-500 text-xs"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addHeader}
            className="text-blue-600 text-sm hover:underline"
          >
            + Tambah Header
          </button>
        </div>

        {/* Body */}
        {["POST", "PUT", "PATCH"].includes(method) && (
          <div className="space-y-2">
            <label className="block text-sm font-semibold">
              🧩 Body (JSON)
            </label>
            <textarea
              placeholder='{"name": "John"}'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border p-2 rounded font-mono text-sm"
              rows={4}
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          🚀 Generate Code
        </button>
      </form>

      {/* Output Code */}
      {showCode && (
        <div className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-auto relative">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
          >
            Copy
          </button>
          <pre className="text-sm whitespace-pre-wrap">
            <code>{code}</code>
          </pre>
        </div>
      )}

      {/* Explanation */}
      {showCode && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm">
          <h2 className="font-semibold mb-1">💡 Penjelasan Singkat:</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <b>URL API</b> → alamat API yang ingin kamu ambil.
            </li>
            <li>
              <b>Method</b> → jenis permintaan: GET, POST, PUT, DELETE, dll.
            </li>
            <li>
              <b>Headers</b> → informasi tambahan untuk API (misal
              Content-Type).
            </li>
            <li>
              <b>Authorization</b> → isi token bila API-nya butuh autentikasi.
            </li>
            <li>
              <b>Body</b> → isi data JSON untuk POST/PUT/PATCH.
            </li>
            <li>
              <b>Hasil</b> → kode siap pakai di React.
            </li>
          </ul>
        </div>
      )}
    </main>
  );
}

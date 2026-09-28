import assert from "node:assert/strict";
import { decodeBase64, encodeBase64 } from "./base64.mjs";

const samples = [
  "",
  "halo dunia",
  "Toolsz",
  "日本語のテキスト",
  "emoji 🚀 & symbol <>&",
  "a".repeat(100000),
];

for (const sample of samples) {
  assert.equal(decodeBase64(encodeBase64(sample)), sample, `roundtrip: ${sample.slice(0, 20)}`);
  assert.equal(
    decodeBase64(encodeBase64(sample, { urlSafe: true }), { urlSafe: true }),
    sample,
    `urlSafe roundtrip: ${sample.slice(0, 20)}`,
  );
}

// RFC 4648 test vector
assert.equal(encodeBase64("Man"), "TWFu");
assert.equal(decodeBase64("SGVsbG8="), "Hello");
assert.equal(decodeBase64("data:text/plain;base64,SGVsbG8="), "Hello");
assert.equal(decodeBase64("SGVs\nbG8="), "Hello");

// url-safe: + dan - tidak boleh muncul
assert.ok(!/[+/=]/.test(encodeBase64("??>>~~", { urlSafe: true })));

// input rusak harus throws dengan pesan ramah, bukan error mentah
assert.throws(() => decodeBase64("halo!"), /tidak valid/);
assert.throws(() => decodeBase64("A"), /tidak valid/);
assert.throws(() => decodeBase64("/w=="), /UTF-8/);

console.log("base64 check: OK");

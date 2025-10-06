import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

const STOPWORDS_EN = [
  "the",
  "and",
  "you",
  "for",
  "are",
  "with",
  "that",
  "this",
  "have",
  "not",
  "but",
  "from",
  "they",
  "your",
  "all",
  "was",
  "his",
  "her",
  "its",
  "has",
  "can",
  "who",
  "will",
  "just",
  "our",
  "out",
  "get",
  "how",
  "had",
  "did",
  "why",
  "what",
  "she",
  "him",
  "their",
  "when",
  "where",
  "which",
  "then",
  "too",
  "also",
  "been",
  "use",
  "each",
  "about",
  "other",
  "than",
  "some",
  "into",
  "only",
  "any",
  "more",
  "very",
  "because",
  "make",
  "like",
  "now",
];

const STOPWORDS_ID = [
  "yang",
  "dan",
  "di",
  "ke",
  "untuk",
  "dengan",
  "dari",
  "pada",
  "adalah",
  "itu",
  "dalam",
  "oleh",
  "akan",
  "juga",
  "ini",
  "atau",
  "sebagai",
  "karena",
  "tidak",
  "sudah",
  "telah",
  "bahwa",
  "bisa",
  "mereka",
  "kami",
  "kita",
  "anda",
  "saya",
  "hanya",
  "masih",
  "agar",
  "lebih",
  "saat",
  "tanpa",
  "semua",
  "bagi",
  "hingga",
];

function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text, stopwords) {
  return text.split(" ").filter((w) => w.length > 2 && !stopwords.includes(w));
}

function countNGrams(words, n) {
  const freq = {};
  for (let i = 0; i <= words.length - n; i++) {
    const gram = words.slice(i, i + n).join(" ");
    freq[gram] = (freq[gram] || 0) + 1;
  }
  return freq;
}

export async function POST(req) {
  try {
    const { url, lang = "id" } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ message: "URL tidak valid" }, { status: 400 });
    }

    const res = await fetch(url);
    const html = await res.text();

    const $ = cheerio.load(html);

    // buang elemen yang bukan konten
    $("script, style, noscript, meta, link, svg").remove();

    // ambil teks murni dari body
    const bodyText = $("body").text();

    const cleanedText = cleanText(bodyText);

    const stopwords = lang === "en" ? STOPWORDS_EN : STOPWORDS_ID;

    const words = tokenize(cleanedText, stopwords);

    const allNgrams = {};
    const topKeywords = {};

    for (let n = 1; n <= 4; n++) {
      const freq = countNGrams(words, n);
      const total = Object.values(freq).reduce((a, b) => a + b, 0);

      const sorted = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([word, count]) => ({
          word,
          count,
          percentage: ((count / total) * 100).toFixed(2),
        }));

      allNgrams[n] = sorted;

      if (sorted.length > 0) {
        topKeywords[n] = sorted[0];
      }
    }

    return NextResponse.json({ topKeywords, allNgrams, url, lang });
  } catch (err) {
    return NextResponse.json(
      { message: "Gagal memproses URL" },
      { status: 500 }
    );
  }
}

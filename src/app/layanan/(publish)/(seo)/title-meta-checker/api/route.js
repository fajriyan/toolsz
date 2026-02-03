import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

function countWords(text = "") {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function estimatePixel(text = "", type = "title") {
  const ratio = type === "title" ? 8.5 : 5.8;
  return Math.round(text.length * ratio);
}

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ message: "URL tidak valid" }, { status: 400 });
    }

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (SEO Checker Bot)",
      },
    });

    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $("title").first().text().trim();
    const metaDescription =
      $('meta[name="description"]').attr("content")?.trim() || "";

    const result = {
      title: {
        text: title,
        character: title.length,
        word: countWords(title),
        pixel: estimatePixel(title, "title"),
        warning: title.length > 60 ? "Your character more than 60" : null,
      },
      meta: {
        text: metaDescription,
        character: metaDescription.length,
        word: countWords(metaDescription),
        pixel: estimatePixel(metaDescription, "meta"),
        warning:
          metaDescription.length > 160 ? "Your character more than 160" : null,
      },
    };

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { message: "Gagal memproses URL" },
      { status: 500 },
    );
  }
}

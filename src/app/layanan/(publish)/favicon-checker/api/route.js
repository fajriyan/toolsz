import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ message: "URL tidak valid" }, { status: 400 });
    }

    const res = await fetch(url);
    const html = await res.text();

    const $ = cheerio.load(html);
    const icons = [];

    $('link[rel*="icon"], link[rel*="apple-touch-icon"]').each((_, el) => {
      icons.push({
        rel: $(el).attr("rel") || "",
        href: $(el).attr("href") || "",
        type: $(el).attr("type") || "",
        sizes: $(el).attr("sizes") || "",
      });
    });

    return NextResponse.json({ icons });
  } catch (err) {
    return NextResponse.json(
      { message: "Gagal memproses URL" },
      { status: 500 }
    );
  }
}

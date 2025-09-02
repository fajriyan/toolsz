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
    const metaTags = [];

    $("meta").each((_, el) => {
      const name = $(el).attr("name") || $(el).attr("property");
      const content = $(el).attr("content");

      if (name && content) {
        metaTags.push({ name, content });
      }
    });

    return NextResponse.json({ meta: metaTags });
  } catch (err) {
    return NextResponse.json(
      { message: "Gagal memproses URL" },
      { status: 500 }
    );
  }
}

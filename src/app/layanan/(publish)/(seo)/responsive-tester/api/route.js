import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ message: "URL tidak valid" }, { status: 400 });
    }

    const res = await fetch(url, { cache: "no-store" });
    const html = await res.text();

    const $ = cheerio.load(html);

    // ambil bagian penting
    const title = $("title").text();
    const body = $("body").html();
    const head = $("head").html();

    return NextResponse.json({ title, head, body });
  } catch (err) {
    return NextResponse.json(
      { message: "Gagal memproses URL" },
      { status: 500 }
    );
  }
}

import axios from "axios";
import https from "https";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url: rawUrl } = await req.json();

    if (!rawUrl)
      return Response.json({ error: "URL tidak boleh kosong" }, { status: 400 });

    // Normalisasi URL
    let url = rawUrl.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;

    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    // Ambil HTML (retries + timeout)
    async function fetchHTML(target, retries = 3) {
      try {
        const res = await axios.get(target, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml",
          },
          httpsAgent,
          timeout: 20000,
          maxRedirects: 10,
        });
        if (res.data?.length < 200 && retries > 0) {
          await new Promise((r) => setTimeout(r, 1000));
          return await fetchHTML(target, retries - 1);
        }
        return res.data;
      } catch (e) {
        if (retries > 0) {
          await new Promise((r) => setTimeout(r, 1000));
          return await fetchHTML(target, retries - 1);
        }
        throw e;
      }
    }

    const html = await fetchHTML(url);
    const $ = cheerio.load(html);

    // Bersihkan elemen tidak perlu
    $("script, style, noscript, svg, iframe, template, meta, link").remove();
    $("[hidden], [aria-hidden='true'], [style*='display:none']").remove();

    // Ambil gambar absolut
    const imgs = $("img")
      .map((_, el) => $(el).attr("src") || $(el).attr("data-src"))
      .get()
      .filter(Boolean)
      .filter((src) => !src.startsWith("data:image")) // skip base64
      .map((src) => {
        if (src.startsWith("//")) return "https:" + src;
        if (src.startsWith("/")) {
          try {
            const u = new URL(url);
            return `${u.origin}${src}`;
          } catch {
            return src;
          }
        }
        return src;
      });

    // Hapus duplikat dan kosong
    const uniqueImgs = [...new Set(imgs)];

    const result = {
      url,
      total_images: uniqueImgs.length,
      images: uniqueImgs,
    };

    return Response.json(result);
  } catch (err) {
    console.error("Image Extractor error:", err);
    return Response.json(
      { error: `Gagal mengambil gambar: ${err.message}` },
      { status: 500 }
    );
  }
}

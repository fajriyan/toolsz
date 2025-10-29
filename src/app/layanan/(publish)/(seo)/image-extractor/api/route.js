import axios from "axios";
import https from "https";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url: rawUrl, includeBackground = false } = await req.json(); // 🆕

    if (!rawUrl)
      return Response.json(
        { error: "URL tidak boleh kosong" },
        { status: 400 }
      );

    // Normalisasi URL
    let url = rawUrl.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;

    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

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

    $("script, style, noscript, svg, iframe, template, meta, link").remove();
    $("[hidden], [aria-hidden='true'], [style*='display:none']").remove();

    // Ambil gambar dari <img> dan data-src
    const imgs = $("img")
      .map((_, el) => $(el).attr("src") || $(el).attr("data-src"))
      .get()
      .filter(Boolean)
      .filter((src) => !src.startsWith("data:image"))
      .map((src) => normalizeUrl(src, url));

    // 🆕 Ambil background-image dari inline style
    let bgImgs = [];
    if (includeBackground) {
      $("[style*='background']").each((_, el) => {
        const style = $(el).attr("style") || "";
        // const matches = style.match(/background(?:-image)?:\s*url\((['"]?)(.*?)\1\)/gi);
        const matches = style.match(/background(?:-image)?\s*:\s*[^;]*url\((['"]?)(.*?)\1\)/gi);
        if (matches) {
          matches.forEach((m) => {
            const urlMatch = m.match(/url\((['"]?)(.*?)\1\)/i);
            if (urlMatch && urlMatch[2]) {
              bgImgs.push(normalizeUrl(urlMatch[2], url));
            }
          });
        }
      });
    }

    // Gabungkan dan hapus duplikat
    const uniqueImgs = [...new Set([...imgs, ...bgImgs].filter(Boolean))];

    return Response.json({
      url,
      total_images: uniqueImgs.length,
      images: uniqueImgs,
    });
  } catch (err) {
    console.error("Image Extractor error:", err);
    return Response.json(
      { error: `Gagal mengambil gambar: ${err.message}` },
      { status: 500 }
    );
  }
}

// 🧩 helper buat URL absolut
function normalizeUrl(src, base) {
  try {
    if (src.startsWith("//")) return "https:" + src;
    if (src.startsWith("/")) return new URL(src, base).toString();
    if (!/^https?:\/\//i.test(src)) {
      const u = new URL(base);
      return `${u.origin}/${src}`;
    }
    return src;
  } catch {
    return src;
  }
}

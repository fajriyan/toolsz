import axios from "axios";
import https from "https";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url: rawUrl, includeBackground = false } = await req.json();

    if (!rawUrl)
      return Response.json(
        { error: "URL tidak boleh kosong" },
        { status: 400 }
      );

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

    // --- Ambil video dari <video>
    const videoTags = $("video")
      .map((_, el) => $(el).attr("src") || $(el).attr("data-src"))
      .get()
      .filter(Boolean)
      .map((src) => normalizeUrl(src, url));

    // --- Ambil video dari <source> (kadang <video> pakai <source>)
    const sourceTags = $("video source")
      .map((_, el) => $(el).attr("src") || $(el).attr("data-src"))
      .get()
      .filter(Boolean)
      .map((src) => normalizeUrl(src, url));

    let bgVideos = [];

    // Ambil background video jika includeBackground=true
    if (includeBackground) {
      $(
        "[style*='background'], [style*='background-video'], [data-bg-video]"
      ).each((_, el) => {
        const style = $(el).attr("style") || "";

        const matches = style.match(/url\((['"]?)(.*?)\1\)/gi);
        if (matches) {
          matches.forEach((m) => {
            const urlMatch = m.match(/url\((['"]?)(.*?)\1\)/i);
            if (urlMatch && urlMatch[2]) {
              const file = urlMatch[2].toLowerCase();
              if (
                file.endsWith(".mp4") ||
                file.endsWith(".webm") ||
                file.endsWith(".ogg")
              ) {
                bgVideos.push(normalizeUrl(urlMatch[2], url));
              }
            }
          });
        }

        // Untuk custom attribute: data-bg-video="xxx.mp4"
        const bg = $(el).attr("data-bg-video");
        if (bg) {
          bgVideos.push(normalizeUrl(bg, url));
        }
      });
    }

    const uniqueVideos = [
      ...new Set([...videoTags, ...sourceTags, ...bgVideos]),
    ];

    return Response.json({
      url,
      total_videos: uniqueVideos.length,
      videos: uniqueVideos,
    });
  } catch (err) {
    console.error("Video Extractor Error:", err);
    return Response.json(
      { error: `Gagal mengambil video: ${err.message}` },
      { status: 500 }
    );
  }
}

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

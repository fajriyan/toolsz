import axios from "axios";
import https from "https";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url: rawUrl, userAgent = "googlebot" } = await req.json();

    if (!rawUrl)
      return Response.json(
        { error: "URL tidak boleh kosong" },
        { status: 400 }
      );

    let url = rawUrl.trim();
    if (!/^https?:\/\//i.test(url)) url = "https://" + url;

    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const uaMap = {
      googlebot:
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      bingbot:
        "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
      chrome:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };

    const html = await axios
      .get(url, {
        headers: { "User-Agent": uaMap[userAgent] || uaMap.chrome },
        httpsAgent,
        timeout: 20000,
        maxRedirects: 10,
      })
      .then((r) => r.data);

    const $ = cheerio.load(html);
    $("script, style, noscript, svg, iframe, template, meta, link").remove();

    return Response.json({ html: $.html() });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

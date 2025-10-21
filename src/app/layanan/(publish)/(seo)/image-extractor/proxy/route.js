import axios from "axios";
import https from "https";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const target = searchParams.get("url");
    if (!target) {
      return new Response("Missing URL", { status: 400 });
    }

    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios.get(target, {
      responseType: "arraybuffer",
      httpsAgent,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: target,
      },
    });

    const contentType = response.headers["content-type"] || "image/jpeg";
    return new Response(response.data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (err) {
    console.error("Proxy error:", err.message);
    return new Response("Gagal mengambil gambar.", { status: 500 });
  }
}

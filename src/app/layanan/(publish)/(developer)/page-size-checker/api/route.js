export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return Response.json({ error: "URL is required" }, { status: 400 });
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "NextJS Page Size Checker",
      },
    });

    const html = await res.text();

    const bytes = new TextEncoder().encode(html).length;
    const kb = (bytes / 1024).toFixed(2);
    const mb = (bytes / (1024 * 1024)).toFixed(4);

    return Response.json({
      bytes,
      kb,
      mb,
    });
  } catch (error) {
    return Response.json({ error: "Analisis Gagal. Masukkan URL yang benar" }, { status: 500 });
  }
}
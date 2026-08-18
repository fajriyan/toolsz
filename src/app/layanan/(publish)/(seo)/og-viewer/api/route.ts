import { NextRequest, NextResponse } from "next/server";

function extractMeta(html: string, property: string): string | null {
   // Cari <meta property="og:xxx" content="..."> atau name="twitter:xxx"
   const patterns = [
      new RegExp(
         `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*)["']`,
         "i",
      ),
      new RegExp(
         `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${property}["']`,
         "i",
      ),
   ];
   for (const re of patterns) {
      const match = html.match(re);
      if (match) return match[1];
   }
   return null;
}

function extractTitle(html: string): string | null {
   const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
   return match ? match[1].trim() : null;
}

function extractFavicon(html: string, baseUrl: string): string | null {
   const match = html.match(
      /<link[^>]+rel=["'](?:shortcut icon|icon)["'][^>]+href=["']([^"']*)["']/i,
   );
   if (!match) return null;
   try {
      return new URL(match[1], baseUrl).toString();
   } catch {
      return null;
   }
}

function resolveUrl(url: string | null, baseUrl: string): string | null {
   if (!url) return null;
   try {
      return new URL(url, baseUrl).toString();
   } catch {
      return null;
   }
}

export async function GET(req: NextRequest) {
   const targetUrl = req.nextUrl.searchParams.get("url");

   if (!targetUrl) {
      return NextResponse.json(
         { error: "Parameter 'url' wajib diisi" },
         { status: 400 },
      );
   }

   let parsedUrl: URL;
   try {
      parsedUrl = new URL(targetUrl);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
         throw new Error("Protokol tidak didukung");
      }
   } catch {
      return NextResponse.json({ error: "URL tidak valid" }, { status: 400 });
   }

   try {
      const res = await fetch(parsedUrl.toString(), {
         headers: {
            "User-Agent":
               "Mozilla/5.0 (compatible; OGPreviewBot/1.0; +https://toolsz.vercel.app)",
         },
         // Batasi waktu fetch biar gak nge-hang
         signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) {
         return NextResponse.json(
            { error: `Gagal mengambil halaman (status ${res.status})` },
            { status: 502 },
         );
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("text/html")) {
         return NextResponse.json(
            { error: "URL bukan halaman HTML" },
            { status: 415 },
         );
      }

      const html = await res.text();
      const base = parsedUrl.toString();

      const data = {
         url: base,
         title: extractMeta(html, "og:title") || extractTitle(html) || "",
         description:
            extractMeta(html, "og:description") ||
            extractMeta(html, "description") ||
            "",
         image: resolveUrl(
            extractMeta(html, "og:image") || extractMeta(html, "twitter:image"),
            base,
         ),
         siteName: extractMeta(html, "og:site_name") || parsedUrl.hostname,
         twitterCard: extractMeta(html, "twitter:card") || "summary",
         twitterTitle: extractMeta(html, "twitter:title"),
         twitterDescription: extractMeta(html, "twitter:description"),
         favicon: extractFavicon(html, base),
         domain: parsedUrl.hostname,
      };

      return NextResponse.json(data);
   } catch (err) {
      const message =
         err instanceof Error && err.name === "TimeoutError"
            ? "Waktu fetch habis (timeout)"
            : "Gagal mengambil atau memproses halaman";
      return NextResponse.json({ error: message }, { status: 500 });
   }
}

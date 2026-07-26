import { CronExpressionParser } from "cron-parser";

// Whitelist timezone valid, biar user gak bisa kirim string sembarangan ke parser
const ALLOWED_TIMEZONES = new Set([
   "Asia/Jakarta",
   "Asia/Makassar",
   "Asia/Jayapura",
   "UTC",
   "Asia/Bangkok",
   "Asia/Singapore",
   "Asia/Tokyo",
   "Asia/Kolkata",
   "Europe/London",
   "Europe/Amsterdam",
   "America/New_York",
   "America/Los_Angeles",
]);

export async function GET(request) {
   try {
      const { searchParams } = new URL(request.url);
      const cronString = searchParams.get("cron");
      const tzParam = searchParams.get("tz");

      if (!cronString || !cronString.trim()) {
         return new Response(
            JSON.stringify({ error: "Parameter cron tidak ditemukan" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
         );
      }

      const trimmed = cronString.trim();
      const fieldCount = trimmed.split(/\s+/).filter(Boolean).length;

      if (fieldCount !== 5) {
         return new Response(
            JSON.stringify({
               error: `Cron harus terdiri dari 5 field (menit jam tanggal bulan hari), ditemukan ${fieldCount}`,
            }),
            { status: 400, headers: { "Content-Type": "application/json" } },
         );
      }

      const tz = ALLOWED_TIMEZONES.has(tzParam) ? tzParam : "Asia/Jakarta";

      const interval = CronExpressionParser.parse(trimmed, {
         currentDate: new Date(),
         tz,
      });

      const preview = interval.take(5).map((date) => date.toString());

      return new Response(JSON.stringify({ preview }), {
         status: 200,
         headers: { "Content-Type": "application/json" },
      });
   } catch (e) {
      return new Response(
         JSON.stringify({ error: "Format cron tidak valid" }),
         { status: 400, headers: { "Content-Type": "application/json" } },
      );
   }
}

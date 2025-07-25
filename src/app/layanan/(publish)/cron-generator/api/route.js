import { CronExpressionParser } from "cron-parser";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const cronString = searchParams.get("cron");

    if (!cronString) {
      return new Response(
        JSON.stringify({ error: "Parameter cron tidak ditemukan" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const interval = CronExpressionParser.parse(cronString.trim(), {
      currentDate: new Date(),
      tz: "Asia/Jakarta",
    });

    const preview = interval.take(5).map((date) => date.toString());

    return new Response(JSON.stringify({ preview }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Format cron tidak valid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

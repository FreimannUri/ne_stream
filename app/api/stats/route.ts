export const dynamic = "force-dynamic";
const STATS = process.env.STATS_URL ?? "http://127.0.0.1:9100/stats";

export async function GET(req: Request) {
  const since = Number(new URL(req.url).searchParams.get("since")) || 0;
  try {
    const r = await fetch(`${STATS}?since=${since}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    return new Response(await r.text(), {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return Response.json({ offline: true, samples: [] });
  }
}
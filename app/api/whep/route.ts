// export const dynamic = 'force-dynamic';
// const WHEP = process.env.WHEP_URL ?? 'http://127.0.0.1:8889/cam/whep';

// export async function POST(req: Request) {
//   const r = await fetch(WHEP, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/sdp' },
//     body: await req.text(),
//   });
//   return new Response(await r.text(), {
//     status: r.status,
//     headers: { 'Content-Type': 'application/sdp' },
//   });
// }

export const dynamic = 'force-dynamic';
const WHEP = process.env.WHEP_URL ?? 'http://127.0.0.1:8889/cam/whep';

export async function POST(req: Request) {
  try {
    const r = await fetch(WHEP, {
      method: 'POST',
      headers: { 'Content-Type': 'application/sdp' },
      body: await req.text(),
      signal: AbortSignal.timeout(5000),
    });
    return new Response(await r.text(), {
      status: r.status,
      headers: { 'Content-Type': 'application/sdp' },
    });
  } catch {
    return new Response('upstream unavailable', { status: 404 });
  }
}
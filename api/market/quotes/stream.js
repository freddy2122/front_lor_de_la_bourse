export const config = { runtime: 'edge' };

async function fetchSnapshot() {
  try {
    const res = await fetch('https://r.jina.ai/https://www.richbourse.com/common/variation/index', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store',
    });
    const txt = await res.text();
    // On utilise un hash simple basé sur la longueur + quelques caractères
    const key = `${txt.length}-${txt.slice(0, 200)}`;
    return key;
  } catch (_) {
    return '';
  }
}

export default async function handler(req) {
  const encoder = new TextEncoder();
  let stopped = false;
  let lastKey = await fetchSnapshot();

  const stream = new ReadableStream({
    start(controller) {
      function send(obj) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      }

      // signal initial d'ouverture
      send({ type: 'open', ts: Date.now(), key: lastKey });

      const ping = setInterval(() => {
        if (stopped) return;
        send({ type: 'ping', ts: Date.now() });
      }, 25000);

      const poll = setInterval(async () => {
        if (stopped) return;
        const k = await fetchSnapshot();
        if (k && k !== lastKey) {
          lastKey = k;
          send({ type: 'update', ts: Date.now(), key: lastKey });
        }
      }, 15000);

      const abortHandler = () => {
        stopped = true;
        try { clearInterval(ping); } catch {}
        try { clearInterval(poll); } catch {}
        try { controller.close(); } catch {}
      };

      try { req.signal.addEventListener('abort', abortHandler); } catch {}
    },
    cancel() {
      stopped = true;
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

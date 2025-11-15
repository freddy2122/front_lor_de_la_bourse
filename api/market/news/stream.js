export const config = { runtime: 'edge' };

function toISODate(pathOrText) {
  const m = String(pathOrText).match(/(\d{2})-(\d{2})-(\d{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

async function fetchLatestDate() {
  try {
    const res = await fetch('https://www.richbourse.com/common/news/index', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store',
    });
    const html = await res.text();
    const re = /href="(\/common\/news\/details\/[^\"]+)"/g;
    let m, latest = '';
    while ((m = re.exec(html))) {
      const d = toISODate(m[1]);
      if (d && d > latest) latest = d;
    }
    return latest;
  } catch (_) {
    return '';
  }
}

export default async function handler(req) {
  const encoder = new TextEncoder();
  let stopped = false;
  let lastSeen = await fetchLatestDate();

  const stream = new ReadableStream({
    start(controller) {
      function send(obj) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      }

      // send initial open signal
      send({ type: 'open', ts: Date.now(), last: lastSeen });

      const ping = setInterval(() => {
        if (stopped) return;
        send({ type: 'ping', ts: Date.now() });
      }, 25000);

      const poll = setInterval(async () => {
        if (stopped) return;
        const latest = await fetchLatestDate();
        if (latest && latest > lastSeen) {
          lastSeen = latest;
          send({ type: 'update', last: lastSeen, ts: Date.now() });
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
    }
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

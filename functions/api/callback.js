// Cloudflare Pages Function: POST /api/callback
// Emails a call-back request (name, phone, best time, topic) to the clinic through Web3Forms.
// Needs the WEB3FORMS_KEY variable in Cloudflare. Get a free key at web3forms.com using the
// email address that should receive the requests.
// Only these four fields are sent. No health details are collected.
const TOPICS = ['Booking a visit', 'IV therapy', 'Weight loss', 'Injections', 'Membership', 'Hormone therapy waitlist', 'Something else'];
const TIMES = ['Any time', 'Morning', 'Afternoon', 'Evening'];

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

export async function onRequestPost({ request, env }) {
  if (!env.WEB3FORMS_KEY) return json({ error: 'not_configured' }, 503);
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: 'forbidden' }, 403);

  let b;
  try {
    b = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }
  if (b.website) return json({ ok: true }); // hidden field filled in: a spam bot

  const name = String(b.name || '').trim().slice(0, 80);
  const digits = String(b.phone || '').replace(/\D/g, '');
  const phone = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  const topic = TOPICS.includes(b.topic) ? b.topic : 'Something else';
  const time = TIMES.includes(b.time) ? b.time : 'Any time';
  if (!name || phone.length !== 10) return json({ error: 'invalid' }, 400);
  const pretty = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;

  const res = await fetch(env.WEB3FORMS_URL || 'https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      access_key: env.WEB3FORMS_KEY,
      subject: `Call-back request: ${name} (${topic})`,
      from_name: 'iThrive website chat',
      name,
      phone: pretty,
      'best time': time,
      topic,
    }),
  }).catch(() => null);
  if (!res || !res.ok) return json({ error: 'upstream' }, 502);
  return json({ ok: true });
}

export const onRequest = () => json({ error: 'method_not_allowed' }, 405);

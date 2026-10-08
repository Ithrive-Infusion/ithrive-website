// Cloudflare Pages Function: POST /api/chat
// Sends the visitor's conversation to Claude with the clinic's instructions.
// Needs the ANTHROPIC_API_KEY secret in Cloudflare (Settings > Variables and Secrets).
// Optional: CHAT_MODEL to change the model.
import { buildSystemPrompt } from '../../src/chat/prompt.js';

const MAX_TURNS = 12;        // messages kept from the conversation
const MAX_CHARS = 600;       // longest visitor message accepted
const MAX_CONVERSATION = 40; // visitor messages per conversation before we ask them to call

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'not_configured' }, 503);

  // Only accept requests from this website.
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: 'forbidden' }, 403);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const raw = Array.isArray(body?.messages) ? body.messages : [];
  const userCount = raw.filter((m) => m?.role === 'user').length;
  if (userCount > MAX_CONVERSATION) {
    return json({ reply: 'We have covered a lot! For anything else, please call or text the clinic and the team will help.\n[CALL]' });
  }

  // Clean the history: text only, alternating roles, starting and ending with the visitor.
  const messages = [];
  for (const m of raw.slice(-MAX_TURNS)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string') continue;
    const content = m.content.trim().slice(0, MAX_CHARS);
    if (!content) continue;
    if (messages.length && messages[messages.length - 1].role === m.role) {
      messages[messages.length - 1].content += '\n' + content;
    } else {
      messages.push({ role: m.role, content });
    }
  }
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== 'user') return json({ error: 'bad_request' }, 400);

  const apiUrl = env.ANTHROPIC_API_URL || 'https://api.anthropic.com/v1/messages';
  let res;
  try {
    res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: env.CHAT_MODEL || 'claude-haiku-5-5',
        max_tokens: 1500,
        system: buildSystemPrompt(),
        messages,
      }),
    });
  } catch {
    return json({ error: 'upstream' }, 502);
  }
  if (!res.ok) {
    console.log('Claude API error', res.status, (await res.text()).slice(0, 300));
    return json({ error: 'upstream' }, 502);
  }
  const data = await res.json();
  const reply = (data.content || [])
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
  if (!reply) return json({ error: 'upstream' }, 502);
  return json({ reply });
}

export const onRequest = () => json({ error: 'method_not_allowed' }, 405);

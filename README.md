# iThrive Infusion & Wellness website

The new ithriveinfusion.com, replacing the WordPress site. It's a fast static site built with [Astro](https://astro.build).

## Where things live

| To change… | Edit this file |
|---|---|
| Prices, drips, injections, memberships | `src/data/services.json` |
| Phone, address, hours, booking links, social links | `src/data/site.json` |
| Page wording | `src/pages/*.astro` |
| Colors and fonts | `src/styles/global.css` |
| Old WordPress URLs → new pages | `astro.config.mjs` and `public/_redirects` |
| Chatbot rules and extra answers | `src/chat/prompt.js` (prices and hours come from the data files automatically) |
| Reviews on the homepage | `src/data/reviews.json` |

Prices live in one place only, so a change in `services.json` updates every page that shows it.
To hide an item until it's approved, add `"review": true` to it.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
```

## Hosting

The site is hosted on Cloudflare Pages (project `ithrive`, preview at https://ithrive.pages.dev). Every change pushed to `main` goes live in about a minute. `public/_redirects` gives real 301 redirects from the old WordPress addresses. When it's approved, point the ithriveinfusion.com domain at Cloudflare Pages.

## Chat assistant

The chat bubble on every page uses Claude (Anthropic) through `functions/api/chat.js`. "Call me back" requests are emailed through Web3Forms by `functions/api/callback.js`. Until the keys below are added, the chat shows a polite "call or text us" message instead.

In Cloudflare: Workers & Pages → `ithrive` → Settings → Variables and Secrets → Add (Production):

| Name | Type | Value |
|---|---|---|
| `ANTHROPIC_API_KEY` | Secret | API key from console.anthropic.com (set a monthly spend limit there) |
| `WEB3FORMS_KEY` | Secret | Free access key from web3forms.com, created with the email that should receive call-back requests |
| `CHAT_MODEL` | Text (optional) | Defaults to `claude-haiku-5-5` |

Then redeploy the latest deployment so the keys take effect.

See `REVIEW.md` for decisions still needed before launch.

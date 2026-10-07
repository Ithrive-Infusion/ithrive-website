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

Prices live in one place only, so a change in `services.json` updates every page that shows it.
To hide an item until it's approved, add `"review": true` to it.

## Run it locally

```bash
npm install
npm run images   # copies the logo and Ruth's photo from the old site
npm run dev      # http://localhost:4321
```

## Hosting

Connect this repository to Netlify or Cloudflare Pages (free). `netlify.toml` already has the build settings, and `public/_redirects` gives real 301 redirects from the old WordPress addresses. When it's approved, point the ithriveinfusion.com domain at the new host.

See `REVIEW.md` for decisions still needed before launch.

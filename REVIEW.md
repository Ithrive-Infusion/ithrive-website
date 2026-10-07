# Before launch: decisions and checks

## Needs Ruth's answer
- [ ] **Weight loss consult price:** the site says $100 (credited toward the first month), but OptiMantra reportedly charges $199. Pick one, then update `services.json` and OptiMantra.
- [ ] **Free 10-minute phone consult link:** paste the direct OptiMantra link for this service into `weightLossConsultUrl` in `site.json`. It currently opens the general booking page.
- [ ] **GLP-1 details:** which medications you prescribe, whether each is FDA-approved brand or compounded, and the pharmacy. The weight loss page currently tells patients to ask.
- [ ] **Semaglutide pricing:** confirm $250 in clinic / $300 shipped and Tirzepatide $650 for 8 weeks. The old "Promotional Price" label has been removed.
- [ ] **Hours:** Sunday is shown as closed (the old site didn't list Sunday). Also, the old About page mentioned walk-ins, but the hours say "By appointment only". Which is right?
- [ ] **Hormone therapy:** launch date, and whether it starts with men only. It currently shows as a waitlist page.
- [ ] **Team:** confirm Mankah's title and credentials ("Provider"?), and whether Laiven is still on the team. Send team photos.
- [ ] **Membership:** does "specialty IVs" include NAD+ and high-dose Vitamin C? Confirm it bills monthly.
- [ ] **Social links:** Instagram, Facebook, YouTube and TikTok URLs for `site.json`.
- [ ] **Reviews:** star rating, review count and three short quotes (with permission). There's a placeholder spot on the homepage.
- [ ] **Photos:** you, the team, the clinic and the infusion chairs.

## Hidden until reviewed (`"review": true`)
- PICO IV (CBD): needs regulatory review of IV CBD.
- Sermorelin: needs clinician and pharmacy review.

## Left off on purpose
- Bella oral capsule ingredient list: shown as "Oral medication options, discussed at consult" until reviewed by a clinician and the pharmacy.
- Stand-alone prescription add-ons (Benadryl, Reglan, Toradol, Zofran): now described only as provider-added extras.
- The old 30+ single-shot pages: merged into IV Therapy and Injections, with redirects.

## Legal (have counsel review)
- Privacy policy, terms of use and medical disclaimer are drafts.
- Text-message consent wording, if you start texting patients reminders or marketing.
- All health wording on the site. It was written to avoid treatment claims, but it still needs clinical sign-off and review by a healthcare advertising attorney.

## Launch checklist
- [ ] Run `npm run images`, or add photos to `public/images/` (`logo.png`, `ruth.jpg`)
- [ ] Connect the repository to Netlify or Cloudflare Pages
- [ ] Point the ithriveinfusion.com DNS at the new host
- [ ] Submit `sitemap-index.xml` in Google Search Console
- [ ] Update the website link in your Google Business Profile, if needed
- [ ] Cancel WordPress hosting only after the new site has been live for about two weeks

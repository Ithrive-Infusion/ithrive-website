# Before launch: decisions and checks

## Needs Ruth's answer
- [x] **Weight loss consult price:** now matches OptiMantra: $199 with labs, $100 if the patient brings labs.
- [ ] **GLP-1 prices:** the site now uses OptiMantra's "from $200/month" (semaglutide) and "from $350/month" (tirzepatide). The old website said $250 to $300 for the first month and $650 for 2 months. Confirm which is current.
- [x] **Free phone consult link:** OptiMantra has no direct link per service; it is the first option on the booking page.
- [ ] **GLP-1 details:** which medications you prescribe, whether each is FDA-approved brand or compounded, and the pharmacy. The weight loss page currently tells patients to ask.
- [ ] **Hours:** Sunday is shown as closed (the old site didn't list Sunday). Also, the old About page mentioned walk-ins, but the hours say "By appointment only". Which is right?
- [ ] **Hormone therapy:** launch date, and whether it starts with men only. It currently shows as a waitlist page.
- [x] **Membership:** specialty IVs are excluded (confirmed by OptiMantra and the old IV menu).
- [ ] **Price differences between the website and OptiMantra:** NAD+ ($150 in OptiMantra vs $200 to $500 by dose on the site) and high-dose Vitamin C ($250 vs $110 to $350 by dose). OptiMantra also lists iZen ($175) and a few new add-ons that are not on the site.
- [ ] **Social links:** Instagram, Facebook, YouTube and TikTok URLs for `site.json`.
- [ ] **Reviews:** star rating, review count and three short quotes (with permission). There's a placeholder spot on the homepage.
- [ ] **Photos:** you, the clinic and the infusion chairs.

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

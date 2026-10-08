# Before launch: decisions and checks

## Needs Ruth's answer
- [x] **Weight loss consult price:** now matches OptiMantra: $199 with labs, $100 if the patient brings labs.
- [x] **GLP-1 prices:** using the old website: semaglutide $250 in clinic or $300 shipped (4 weeks); tirzepatide $650 shipped (8 weeks). OptiMantra shows "from $200" and "from $350"; update OptiMantra if the website prices are current.
- [x] **Free phone consult link:** OptiMantra has no direct link per service; it is the first option on the booking page.
- [ ] **GLP-1 details:** the old website does not say whether semaglutide and tirzepatide are FDA-approved brand or compounded, or which pharmacy. The weight loss page tells patients to ask. Bella capsules are listed as compounded (from the old website).
- [x] **Hours:** match the old homepage: Thursday and Friday 8 to 5, Saturday 7 to 6, by appointment only. Sunday to Wednesday closed.
- [ ] **Hormone therapy:** launch date still being decided. Stays as a waitlist page.
- [x] **Membership:** specialty IVs are excluded (confirmed by OptiMantra and the old IV menu).
- [x] **NAD+ and Vitamin C:** keep the website prices; iZen not added. To do: update OptiMantra to match (NAD+ $200 to $500 by dose, Vitamin C $110 to $350 by dose).
- [x] **Social links:** Instagram and Facebook added to the footer (`site.json`).
- [x] **Reviews:** three Google review excerpts on the homepage (`src/data/reviews.json`), first name and last initial only.
- [ ] **Photos:** using the old website photos (now stored in the repo). Replace stock images with real clinic photos when available.

## Hidden until reviewed (`"review": true`)
- PICO IV (CBD): needs regulatory review of IV CBD.
- Sermorelin: needs clinician and pharmacy review.

## Left off on purpose
- Bella oral capsule ingredient list: the site says once-daily compounded capsules, no phentermine, some contain caffeine. Full ingredients are discussed at the consult.
- Stand-alone prescription add-ons (Benadryl, Reglan, Toradol, Zofran): now described only as provider-added extras.
- The old 30+ single-shot pages: merged into IV Therapy and Injections, with redirects.

## Legal (have counsel review)
- Privacy policy, terms of use and medical disclaimer are drafts.
- Text-message consent wording, if you start texting patients reminders or marketing.
- All health wording on the site. It was written to avoid treatment claims, but it still needs clinical sign-off and review by a healthcare advertising attorney.

## Launch checklist
- [x] Photos stored in `public/images/`
- [x] Connected to Cloudflare Pages (ithrive.pages.dev)
- [ ] Point the ithriveinfusion.com DNS at the new host
- [ ] Submit `sitemap-index.xml` in Google Search Console
- [ ] Update the website link in your Google Business Profile, if needed
- [ ] Cancel WordPress hosting only after the new site has been live for about two weeks

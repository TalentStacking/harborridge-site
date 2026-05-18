# Harbor Ridge Capital — Website (v2)

Single-page site. Everything visible on the home page. No team section.

---

## How to add a blog post

1. Copy `posts/_post-template.html` → rename with your slug (e.g. `posts/02-your-slug.html`)
2. Replace the `[BRACKETS]` with title, date, body
3. Open `assets/js/data.js`, add a new entry at the **top** of the `POSTS` array

The Insights tab on the home page auto-updates with the 4 latest. Easiest way: ask Claude.

---

## How to add a case study

1. Copy `posts/_post-template.html` to `case-studies/01-your-slug.html` (same template works)
2. Add an entry to the `CASE_STUDIES` array in `data.js` with `href: 'case-studies/01-your-slug.html'`

---

## How to add a whitepaper (compliance-focused only, per current scope)

1. Drop the PDF into `whitepapers/` (e.g. `whitepapers/cmmc-2026.pdf`)
2. Add an entry to `WHITEPAPERS` in `data.js` with `href: 'whitepapers/cmmc-2026.pdf'`

---

## How to add news (external press)

Just add an entry to the `NEWS` array in `data.js` with the external URL as `href`. It opens in a new tab.

---

## How to add or edit a transaction tombstone

1. Drop the logo image (PNG or JPG, ideally square ~400×400) into `assets/img/transactions/`
2. Open `data.js`, add or edit an entry in the `TRANSACTIONS` array

The cropped tombstones from your deck are already in `assets/img/transactions/`.

---

## File structure

```
/index.html              ← single-page site, all sections here
/assets/
  /css/styles.css        ← all styling
  /js/data.js            ← single source of truth
  /js/main.js            ← renderers, tabs, modal
  /img/transactions/     ← tombstone logos (8 included)
/posts/                  ← blog post HTML files
/case-studies/           ← case study HTML files (same format)
/whitepapers/            ← drop PDFs here
```

---

## Deploy

Drag the unzipped `site-v2` folder onto [netlify.com/drop](https://app.netlify.com/drop). Live URL in 10 seconds. Then point your GoDaddy DNS at it (Netlify gives you the records).

---

## Quick edits — just ask Claude

- *"Add a blog post on the CMMC compliance window"*
- *"Replace the LRQA description with X"*
- *"Add a news entry: LRQA acquires Core Business Solutions, link is..."*
- *"Change the hero line to Y"*
- *"Add Tom Radford to a new Leadership section"* (when ready)

---

## Not built yet (v2 candidates when ready)

- AI-powered confidential valuation tool (needs a small backend)
- "Ask HRC" chatbot (same backend)
- Newsletter signup (drop-in form once you pick a service)
- Real LinkedIn URL for Cyrus (firm LinkedIn is wired in footer)
- Working contact form (currently opens email client; 2 min to wire to Formspree)

---

## SEO

The site is set up with:
- Title and meta description tuned for "M&A advisory + tech founders" keywords
- Open Graph and Twitter card tags for social sharing
- JSON-LD structured data (Organization, FinancialService, Person, Services)
- Canonical URL, sitemap.xml, robots.txt
- Alt text on transaction images
- Semantic HTML (article, section, nav, footer)

**To finalize:**
1. Drop a 1200×630 PNG at `/assets/img/og-image.png` (this is what shows when the site is shared on LinkedIn/X/Slack)
2. Drop your logo at `/assets/img/logo.png`
3. Drop a favicon at `/assets/img/favicon.png` (32×32 or 64×64)
4. After deploying, submit `https://www.harborridgecap.com/sitemap.xml` to Google Search Console

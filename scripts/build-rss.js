#!/usr/bin/env node
// Generates /rss.xml from JSON-LD Article schema in insights/ and case-studies/.
// Uses only Node built-ins. Run by Netlify via netlify.toml on every deploy.

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIRS = ['insights', 'case-studies'];
const SITE_URL = 'https://www.harborridgecap.com';
const FEED_TITLE = 'Harbor Ridge Capital — Insights & Case Studies';
const FEED_DESCRIPTION = 'M&A insights and case studies from Harbor Ridge Capital, boutique M&A advisory for founder-owned software, cybersecurity, and tech-enabled services.';
const MAX_ITEMS = 20;

function decodeHtmlEntities(s) {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function clean(s) {
  return escapeXml(decodeHtmlEntities(s));
}

function toRfc822(isoDate) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  if (isNaN(d)) throw new Error(`Invalid date: ${isoDate}`);
  return d.toUTCString();
}

function extractArticleSchema(html, fileLabel) {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    let data;
    try { data = JSON.parse(m[1]); } catch { continue; }
    const candidates = Array.isArray(data['@graph']) ? data['@graph'] : [data];
    for (const c of candidates) {
      if (c && (c['@type'] === 'Article' || c['@type'] === 'BlogPosting')) return c;
    }
  }
  throw new Error(`No Article schema in ${fileLabel}`);
}

function collectItems() {
  const items = [];
  for (const dir of SOURCE_DIRS) {
    const fullDir = path.join(ROOT, dir);
    if (!fs.existsSync(fullDir)) {
      console.warn(`[rss] Missing source dir: ${dir}`);
      continue;
    }
    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.html'));
    for (const f of files) {
      const fileLabel = `${dir}/${f}`;
      const html = fs.readFileSync(path.join(fullDir, f), 'utf8');
      const a = extractArticleSchema(html, fileLabel);

      const headline = a.headline;
      const description = a.description;
      const datePublished = a.datePublished;
      const mep = a.mainEntityOfPage;
      const link = typeof mep === 'string' ? mep : (mep && (mep['@id'] || mep.url));
      const section = a.articleSection;

      const missing = [];
      if (!headline) missing.push('headline');
      if (!description) missing.push('description');
      if (!datePublished) missing.push('datePublished');
      if (!link) missing.push('mainEntityOfPage.@id');
      if (missing.length) {
        throw new Error(`${fileLabel}: missing required fields ${missing.join(', ')}`);
      }

      items.push({ headline, description, link, datePublished, section, source: fileLabel });
    }
  }
  items.sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  return items.slice(0, MAX_ITEMS);
}

function renderItem(it) {
  const cat = it.section ? `\n      <category>${clean(it.section)}</category>` : '';
  return `    <item>
      <title>${clean(it.headline)}</title>
      <link>${clean(it.link)}</link>
      <description>${clean(it.description)}</description>
      <pubDate>${toRfc822(it.datePublished)}</pubDate>
      <guid isPermaLink="true">${clean(it.link)}</guid>${cat}
    </item>`;
}

function buildRss(items) {
  const lastBuild = new Date().toUTCString();
  const body = items.map(renderItem).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${body}
  </channel>
</rss>
`;
}

function main() {
  const items = collectItems();
  if (items.length === 0) {
    console.error('[rss] No items found; refusing to write empty feed.');
    process.exit(1);
  }
  const xml = buildRss(items);
  const outPath = path.join(ROOT, 'rss.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log(`[rss] Wrote ${outPath} with ${items.length} items.`);
  console.log(`[rss] Most recent: ${items[0].headline} (${items[0].datePublished})`);
  for (const it of items) console.log(`[rss]   ${it.datePublished}  ${it.source}`);
}

main();

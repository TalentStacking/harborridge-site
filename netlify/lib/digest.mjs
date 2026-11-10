// Comparables Weekly digest: verticals config, sheet parsing, stats, holidays and the email template.
// Pure JavaScript with no Node APIs, so the same code can render a preview in a browser.

// ===== Verticals =====
// Adding a vertical = one entry here. Entries with comingSoon show as greyed pills in the jump nav.
//   name      title used in the email and on the website
//   shortName used in the preview text and jump nav
//   sheetId / tabName / range  Google Sheet with the private M&A comps (header row first)
//   pageUrl   vertical page on the site (public comps are read from its PUBLIC array)
//   anchorId  anchor for the section inside the email
export const VERTICALS = [
  {
    name: "CCaaS & UCaaS",
    shortName: "CCaaS/UCaaS",
    sheetId: "1xiHe3sHdSTC1yUIH1YDVJOSKI0X1pv_J-U-_0rE7GzU",
    tabName: "M&A Comps",
    range: "B5:P",
    pageUrl: "/comparables/ccaas-ucaas",
    anchorId: "ccaas-ucaas",
  },
  { name: "AI Services", shortName: "AI Services", anchorId: "ai-services", comingSoon: true },
  { name: "Compliance / Cybersecurity", shortName: "Compliance", anchorId: "compliance", comingSoon: true },
];

// ===== Dates (Pacific Time) =====
export function ptNow(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", hourCycle: "h23", weekday: "short",
    }).formatToParts(date).map(p => [p.type, p.value])
  );
  return { iso: `${parts.year}-${parts.month}-${parts.day}`, hour: Number(parts.hour), weekday: parts.weekday };
}

const pad = n => String(n).padStart(2, "0");
const isoOf = (y, m, d) => `${y}-${pad(m)}-${pad(d)}`; // m is 1-12

export function isoAddDays(iso, days) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return isoOf(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

export function longDate(iso, withWeekday = true) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC", weekday: withWeekday ? "long" : undefined, year: "numeric", month: "long", day: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

function shortDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC", year: "numeric", month: "short", day: "numeric" })
    .format(new Date(Date.UTC(y, m - 1, d)));
}

// ===== US federal holidays (computed, so no yearly list to maintain) =====
function nthWeekday(y, month, weekday, n) { // month 1-12, weekday 0=Sun, n=-1 for last
  if (n > 0) {
    const first = new Date(Date.UTC(y, month - 1, 1)).getUTCDay();
    return isoOf(y, month, 1 + ((weekday - first + 7) % 7) + (n - 1) * 7);
  }
  const lastDay = new Date(Date.UTC(y, month, 0));
  const back = (lastDay.getUTCDay() - weekday + 7) % 7;
  return isoOf(y, month, lastDay.getUTCDate() - back);
}

function observed(y, month, day) { // Saturday → Friday before, Sunday → Monday after
  const wd = new Date(Date.UTC(y, month - 1, day)).getUTCDay();
  const iso = isoOf(y, month, day);
  return wd === 6 ? isoAddDays(iso, -1) : wd === 0 ? isoAddDays(iso, 1) : iso;
}

export function usFederalHolidays(y) {
  return {
    [observed(y, 1, 1)]: "New Year's Day",
    [nthWeekday(y, 1, 1, 3)]: "Martin Luther King Jr. Day",
    [nthWeekday(y, 2, 1, 3)]: "Washington's Birthday",
    [nthWeekday(y, 5, 1, -1)]: "Memorial Day",
    [observed(y, 6, 19)]: "Juneteenth",
    [observed(y, 7, 4)]: "Independence Day",
    [nthWeekday(y, 9, 1, 1)]: "Labor Day",
    [nthWeekday(y, 10, 1, 2)]: "Columbus Day",
    [observed(y, 11, 11)]: "Veterans Day",
    [nthWeekday(y, 11, 4, 4)]: "Thanksgiving Day",
    [observed(y, 12, 25)]: "Christmas Day",
  };
}

// Name of the federal holiday (actual or observed) on this date, or null.
export function holidayOn(iso) {
  const y = Number(iso.slice(0, 4));
  return usFederalHolidays(y)[iso] || usFederalHolidays(y + 1)[iso] || null; // next year's Jan 1 can be observed Dec 31
}

// ===== Sheet parsing =====
const norm = s => String(s || "").replace(/\s+/g, " ").trim().toLowerCase();
const COLUMNS = {
  date: h => h === "date",
  target: h => h === "target",
  acquirer: h => h === "acquirer",
  ev: h => h === "ev",
  evRev: h => h === "ev / ltm rev",
  evEbitda: h => h === "ev / ltm ebitda",
  included: h => h.startsWith("incl"),
  rationale: h => h.startsWith("strategic rationale"),
  vertical: h => h === "vertical",
  url: h => h.startsWith("press release"),
};

function parseDate(s) { // "11/5/2026" → "2026-11-05"
  const m = String(s || "").trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return m ? isoOf(Number(m[3]), Number(m[1]), Number(m[2])) : null;
}

function parseNumber(s) { // "$1,456.7" / "1.7x" → number; "-", "na", "" → null
  const t = String(s == null ? "" : s).replace(/[$,x\s]/gi, "");
  if (!t || !/^-?\d*\.?\d+$/.test(t)) return null;
  return Number(t);
}

// rows: values from the sheet, header row first. Returns one object per dated row.
export function parseDealRows(rows) {
  if (!rows || !rows.length) return [];
  const header = rows[0].map(norm);
  const idx = {};
  for (const [key, test] of Object.entries(COLUMNS)) {
    idx[key] = header.findIndex(test);
    if (idx[key] < 0) throw new Error(`Sheet is missing the "${key}" column`);
  }
  const deals = [];
  for (const row of rows.slice(1)) {
    const cell = k => (row[idx[k]] == null ? "" : String(row[idx[k]]).trim());
    const date = parseDate(cell("date"));
    if (!date || !cell("target")) continue; // skips Average / Median and blank rows
    const url = cell("url");
    deals.push({
      date,
      target: cell("target"),
      acquirer: cell("acquirer"),
      ev: parseNumber(cell("ev")),
      evRev: parseNumber(cell("evRev")),
      evEbitda: parseNumber(cell("evEbitda")),
      included: norm(cell("included")) === "yes",
      rationale: cell("rationale"),
      vertical: cell("vertical"),
      url: /^https?:\/\//i.test(url) ? url : null,
    });
  }
  return deals;
}

// Deals dated from last Tuesday through yesterday (Monday), included only, newest first.
// Back-to-back Tuesday digests cover adjacent, non-overlapping weeks.
export function newThisWeek(deals, todayIso) {
  const from = isoAddDays(todayIso, -7);
  const to = isoAddDays(todayIso, -1);
  return deals.filter(d => d.included && d.date >= from && d.date <= to)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

// ===== Stats =====
export const round1 = v => Math.round(v * 10 + 1e-9) / 10;
function median(arr) {
  const v = arr.filter(x => x != null && isFinite(x)).sort((a, b) => a - b);
  if (!v.length) return null;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}
function average(arr) {
  const v = arr.filter(x => x != null && isFinite(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
}

export function privateStats(deals) {
  const inc = deals.filter(d => d.included);
  const medRev = median(inc.map(d => d.evRev));
  const medEbitda = median(inc.map(d => d.evEbitda));
  return {
    count: inc.length,
    medEvRev: medRev == null ? null : round1(medRev),
    medEvEbitda: medEbitda == null ? null : round1(medEbitda),
  };
}

// Pulls the `const PUBLIC = [ ... ];` array out of a vertical page's HTML.
export function parsePublicFromPage(html) {
  const m = html.match(/const PUBLIC\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!m) throw new Error("PUBLIC array not found on page");
  return new Function(`return ${m[1]};`)();
}

// quotes: optional { TICKER: { mcap } } of live market caps; EV/EBITDA is recomputed from them.
export function publicStats(companies, quotes = {}) {
  const evEbitda = companies.map(c => {
    const q = quotes[c.ticker];
    return q && q.mcap > 0 && c.ebitda > 0 ? round1((q.mcap + c.net_debt) / c.ebitda) : c.ev_ebitda;
  });
  return {
    count: companies.length,
    medEvEbitda: round1(median(evEbitda)),
    medGrowth: round1(median(companies.map(c => c.growth))),
    avgR40: Math.round(average(companies.map(c => c.r40)) + 1e-9),
    live: Object.keys(quotes).length > 0,
  };
}

// ===== Email template =====
const C = {
  green: "#0c3b2e", brass: "#c9a66b", cream: "#f7f3eb", offWhite: "#fbf9f4",
  ink: "#1a2a25", inkSoft: "#4a5a55", border: "#e8e2d4", muted: "#9aa5a1",
};
const F = {
  display: "'Playfair Display', Georgia, 'Times New Roman', serif",
  serif: "'IBM Plex Serif', Georgia, 'Times New Roman', serif",
  sans: "'IBM Plex Sans', Arial, Helvetica, sans-serif",
};

const esc = s => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fmtMult = v => (v == null ? "—" : `${v.toFixed(1)}x`);
const fmtEv = v => (v == null ? "Undisclosed" : `$${v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}M`);

function oneLine(text) { // first clause of the sheet's rationale
  let t = String(text || "").split(";")[0].trim();
  if (t && !/[.!?]$/.test(t)) t += ".";
  return t;
}

const label = text =>
  `<div style="font-family:${F.sans};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-weight:600;color:${C.green};padding:0 0 8px;border-bottom:1px solid ${C.border};margin:0 0 14px;">${text}</div>`;

const arrowLink = (href, text) =>
  `<a href="${esc(href)}" style="font-family:${F.sans};font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;color:#a8844a;text-decoration:none;">${text} &rarr;</a>`;

function pill(v, sections) {
  const base = `display:inline-block;padding:7px 14px;margin:0 6px 8px 0;border-radius:999px;font-family:${F.sans};font-size:11px;line-height:1;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;text-decoration:none;`;
  if (v.comingSoon) {
    return `<span style="${base}border:1px solid ${C.border};background:${C.cream};color:${C.muted};">${esc(v.shortName)} &middot; Coming soon</span>`;
  }
  const s = sections.find(x => x.vertical.anchorId === v.anchorId);
  if (s && s.newDeals.length) {
    return `<a href="#${v.anchorId}" style="${base}border:1px solid ${C.brass};background:${C.brass};color:${C.green};">${esc(v.name)}</a>`;
  }
  // Live vertical with no new deals this week: link to its page instead of an email section.
  return `<a href="${esc(s ? s.pageHref : "#")}" style="${base}border:1px solid ${C.brass};background:transparent;color:${C.green};">${esc(v.name)} &middot; No new deals</a>`;
}

function dealCard(d, i) {
  const bg = i % 2 ? C.cream : "#ffffff";
  const metric = (name, value) =>
    `<td valign="top" style="padding:0 18px 0 0;">
      <div style="font-family:${F.sans};font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:${C.inkSoft};padding-bottom:3px;">${name}</div>
      <div style="font-family:${F.serif};font-size:15px;color:${C.ink};">${value}</div>
    </td>`;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;background:${bg};border:1px solid ${C.border};border-left:3px solid ${C.brass};margin:0 0 10px;">
    <tr><td style="padding:16px 18px;">
      <div style="font-family:${F.sans};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${C.inkSoft};padding-bottom:6px;">${esc(shortDate(d.date))}</div>
      <div style="font-family:${F.display};font-size:20px;line-height:1.25;font-weight:500;color:${C.green};">${esc(d.target)}</div>
      <div style="font-family:${F.serif};font-size:14px;color:${C.inkSoft};padding:2px 0 12px;">Acquirer: <span style="color:${C.ink};">${esc(d.acquirer)}</span></div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        ${metric("EV", esc(fmtEv(d.ev)))}${metric("EV / Rev", fmtMult(d.evRev))}${metric("EV / EBITDA", fmtMult(d.evEbitda))}
      </tr></table>
      <div style="font-family:${F.serif};font-size:14px;line-height:1.55;color:${C.ink};padding-top:12px;">${esc(oneLine(d.rationale))}</div>
      ${d.url ? `<div style="padding-top:10px;">${arrowLink(d.url, "Press release")}</div>` : ""}
    </td></tr>
  </table>`;
}

function section(s) {
  const v = s.vertical;
  const p = s.privateStats;
  const pub = s.publicStats;
  const title = esc(v.name);
  return `
  <tr><td class="px" id="${v.anchorId}" style="padding:30px 32px 6px;border-top:1px solid ${C.border};">
    <a name="${v.anchorId}" style="display:block;height:0;"></a>
    <div style="font-family:${F.sans};font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-weight:600;color:#a8844a;padding-bottom:8px;">Vertical</div>
    <h2 style="margin:0 0 22px;font-family:${F.display};font-size:28px;line-height:1.2;font-weight:500;color:${C.green};">${title} <em style="color:${C.brass};font-style:italic;">Comparables</em></h2>

    ${label(`New This Week &middot; ${s.newDeals.length}`)}
    ${s.newDeals.map(dealCard).join("")}

    <div style="height:18px;line-height:18px;font-size:1px;">&nbsp;</div>
    ${label("Private Comp Multiples (Running)")}
    <div style="font-family:${F.serif};font-size:15px;line-height:1.6;color:${C.ink};">
      Median EV/Rev <strong style="color:${C.green};">${fmtMult(p.medEvRev)}</strong> &middot;
      Median EV/EBITDA <strong style="color:${C.green};">${fmtMult(p.medEvEbitda)}</strong>
      <span style="color:${C.inkSoft};">across ${p.count} included transactions</span>
    </div>

    ${pub ? `
    <div style="height:22px;line-height:22px;font-size:1px;">&nbsp;</div>
    ${label("Public Comps Snapshot")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:${F.serif};font-size:15px;color:${C.ink};">
      <tr><td style="padding:0 0 6px;">Median EV / LTM EBITDA</td><td align="right" style="padding:0 0 6px;color:${C.green};font-weight:500;">${fmtMult(pub.medEvEbitda)}</td></tr>
      <tr><td style="padding:0 0 6px;">Median YoY revenue growth</td><td align="right" style="padding:0 0 6px;color:${C.green};font-weight:500;">${pub.medGrowth.toFixed(1)}%</td></tr>
      <tr><td style="padding:0 0 6px;">Average Rule of 40</td><td align="right" style="padding:0 0 6px;color:${C.green};font-weight:500;">${pub.avgR40}</td></tr>
    </table>
    <div style="font-family:${F.serif};font-size:12px;font-style:italic;color:${C.inkSoft};padding:2px 0 10px;">${pub.count} public companies${pub.live ? ", priced at this morning's latest quotes" : ""}.</div>
    ${arrowLink(s.pageHref + "#public", "View full public comps")}` : ""}

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 24px;"><tr>
      <td style="background:${C.green};">
        <a href="${esc(s.pageHref)}" style="display:inline-block;padding:13px 22px;font-family:${F.sans};font-size:12px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;color:${C.cream};text-decoration:none;">View full ${esc(v.name)} table &rarr;</a>
      </td>
    </tr></table>
  </td></tr>`;
}

const DISCLAIMER = `Securities products and investment banking services are offered through <a href="http://www.basecuritiesllc.com/" style="color:${C.brass};">BA Securities, LLC</a>. Member <a href="http://www.finra.org/" style="color:${C.brass};">FINRA</a> / <a href="http://www.sipc.org/" style="color:${C.brass};">SIPC</a>. Harbor Ridge Capital and BA Securities, LLC are separate, unaffiliated entities. Past performance, awards, or testimonials are not indicative of future results. No guarantee of future performance or success is implied.`;

// MailerLite merge tags; the preview swaps in sample values.
export const MERGE_TAGS = { email: "{$email}", unsubscribe: "{$unsubscribe}", preferences: "{$preferences}" };

// sections: [{ vertical, newDeals, privateStats, publicStats|null }] for live verticals.
export function renderDigest({ dateISO, sections, siteUrl, verticals = VERTICALS, tags = MERGE_TAGS, postalAddress = "Los Angeles, California" }) {
  const site = siteUrl.replace(/\/$/, "");
  sections.forEach(s => { s.pageHref = site + s.vertical.pageUrl; });
  const withDeals = sections.filter(s => s.newDeals.length);
  const total = withDeals.reduce((n, s) => n + s.newDeals.length, 0);

  const subject = `Harbor Ridge Comparables — ${longDate(dateISO, false)} — ${total} new transaction${total === 1 ? "" : "s"}`;
  const previewText = `This week: ${withDeals.map(s => s.vertical.shortName).join(", ")}`;
  const intro = `${total} new transaction${total === 1 ? "" : "s"} this week across ${withDeals.map(s => esc(s.vertical.name)).join(", ")}.`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(subject)}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;1,500&family=IBM+Plex+Serif:wght@400;500&family=IBM+Plex+Sans:wght@500;600&display=swap');
  body { margin:0; padding:0; -webkit-text-size-adjust:100%; }
  a { color:${C.green}; }
  @media (max-width: 620px) {
    .container { width:100% !important; }
    .px { padding-left:20px !important; padding-right:20px !important; }
    .stack { display:block !important; width:100% !important; text-align:left !important; padding-top:10px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.cream};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:${C.cream};">${esc(previewText)}${"&zwnj;&nbsp;".repeat(60)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.cream};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${C.offWhite};border:1px solid ${C.border};">

  <tr><td class="px" style="background:${C.green};padding:26px 32px;border-bottom:3px solid ${C.brass};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td class="stack" valign="middle">
        <div style="font-family:${F.display};font-size:20px;letter-spacing:0.14em;color:#ffffff;font-weight:500;">HARBOR RIDGE CAPITAL</div>
        <div style="font-family:${F.sans};font-size:11px;letter-spacing:0.28em;color:${C.brass};font-weight:600;padding-top:6px;">COMPARABLES WEEKLY</div>
      </td>
      <td class="stack" valign="middle" align="right" style="font-family:${F.sans};font-size:12px;color:${C.cream};letter-spacing:0.04em;white-space:nowrap;">${esc(longDate(dateISO))}</td>
    </tr></table>
  </td></tr>

  <tr><td class="px" style="padding:28px 32px 6px;">
    <div style="font-family:${F.display};font-size:24px;line-height:1.3;font-style:italic;color:${C.green};padding-bottom:6px;">This week in transaction comparables</div>
    <div style="font-family:${F.serif};font-size:15px;line-height:1.6;color:${C.inkSoft};padding-bottom:18px;">${intro}</div>
    ${verticals.map(v => pill(v, sections)).join("")}
  </td></tr>

  ${withDeals.map(section).join("")}

  <tr><td class="px" style="background:${C.green};padding:28px 32px;">
    <div style="font-family:${F.serif};font-size:13px;line-height:1.6;color:${C.cream};padding-bottom:16px;">
      This digest was sent to ${tags.email}.
      <a href="${tags.unsubscribe}" style="color:${C.brass};">Unsubscribe</a> |
      <a href="${tags.preferences}" style="color:${C.brass};">Update preferences</a>
    </div>
    <div style="font-family:${F.display};font-size:16px;color:#ffffff;padding-bottom:4px;">Harbor Ridge Capital</div>
    <div style="font-family:${F.serif};font-size:13px;line-height:1.6;color:${C.cream};padding-bottom:4px;">M&amp;A advisory for founder-owned software, cybersecurity, and tech-enabled services companies.</div>
    <div style="font-family:${F.sans};font-size:12px;color:${C.cream};opacity:0.85;padding-bottom:18px;">${esc(postalAddress)} &middot; <a href="${site}/comparables" style="color:${C.brass};">harborridgecap.com/comparables</a></div>
    <div style="font-family:${F.serif};font-size:11px;line-height:1.6;color:${C.cream};opacity:0.75;border-top:1px solid #1e5a48;padding-top:14px;">${DISCLAIMER}</div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, previewText, html, total };
}

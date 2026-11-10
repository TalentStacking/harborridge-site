// Netlify Scheduled Function: Comparables Weekly digest, Tuesdays at 8:00 AM Pacific.
//
// Cron runs in UTC, so it fires at 15:00 and 16:00 UTC on Tuesdays and only the run that lands
// on 8 AM Pacific proceeds (15:00 UTC in daylight time, 16:00 UTC in standard time).
//
// Skips the send when: today is a US federal holiday (actual or observed); no vertical has a
// new included transaction dated last Tuesday through Monday; or today's campaign already exists.
//
// Env: MAILERLITE_API_KEY, GOOGLE_SERVICE_ACCOUNT_JSON (or GOOGLE_SHEETS_API_KEY), FINNHUB_API_KEY.
// Optional: DIGEST_DRY_RUN=true builds the email and logs it without creating a campaign;
//           DIGEST_FROM_EMAIL (default research@harborridgecap.com, must be verified in MailerLite).

import {
  VERTICALS, ptNow, holidayOn, parseDealRows, newThisWeek, privateStats,
  parsePublicFromPage, publicStats, renderDigest,
} from "../lib/digest.mjs";
import { getSheetValues } from "../lib/google-sheets.mjs";
import { fetchTicker } from "../lib/finnhub.mjs";
import { ml, getGroupId } from "../lib/mailerlite.mjs";

const FROM_EMAIL = process.env.DIGEST_FROM_EMAIL || "research@harborridgecap.com";
const FROM_NAME = "Harbor Ridge Capital";

const log = (...a) => console.log("[weekly-digest]", ...a);

async function loadPublicStats(siteUrl, vertical) {
  const res = await fetch(siteUrl + vertical.pageUrl);
  if (!res.ok) throw new Error(`page HTTP ${res.status}`);
  const companies = parsePublicFromPage(await res.text());
  const quotes = {};
  const key = process.env.FINNHUB_API_KEY;
  if (key) {
    const results = await Promise.allSettled(companies.map(c => fetchTicker(c.ticker, key)));
    results.forEach((r, i) => { if (r.status === "fulfilled") quotes[companies[i].ticker] = r.value; });
  }
  return publicStats(companies, quotes); // falls back to the page's saved prices for any missing quote
}

async function campaignExists(name) {
  for (const status of ["sent", "ready"]) {
    const res = await ml(`/campaigns?limit=25&filter[status]=${status}`);
    if ((res.data || []).some(c => c.name === name)) return true;
  }
  return false;
}

export default async () => {
  const now = ptNow();
  if (now.weekday !== "Tue" || now.hour !== 8) return log(`skip: ${now.weekday} ${now.hour}:00 PT is not Tuesday 8 AM PT`);

  const holiday = holidayOn(now.iso);
  if (holiday) return log(`skip: ${now.iso} is ${holiday}`);

  const siteUrl = (process.env.URL || "https://harborridgecap.com").replace(/\/$/, "");
  const sections = [];
  for (const vertical of VERTICALS.filter(v => !v.comingSoon)) {
    const rows = await getSheetValues(vertical.sheetId, `'${vertical.tabName}'!${vertical.range}`);
    const deals = parseDealRows(rows);
    let pub = null;
    try { pub = await loadPublicStats(siteUrl, vertical); }
    catch (err) { console.error(`[weekly-digest] public comps unavailable for ${vertical.name}:`, err.message); }
    sections.push({ vertical, newDeals: newThisWeek(deals, now.iso), privateStats: privateStats(deals), publicStats: pub });
    log(`${vertical.name}: ${deals.length} rows, ${sections.at(-1).newDeals.length} new this week`);
  }

  const digest = renderDigest({ dateISO: now.iso, sections, siteUrl });
  if (!digest.total) return log("skip: no new transactions this week in any vertical");

  if (process.env.DIGEST_DRY_RUN === "true") return log(`dry run, not sending: "${digest.subject}" (${digest.html.length} bytes)`);

  const name = `Comparables Weekly — ${now.iso}`;
  if (await campaignExists(name)) return log(`skip: campaign "${name}" already exists`);

  const groupId = await getGroupId();
  const created = await ml("/campaigns", {
    method: "POST",
    body: {
      name,
      type: "regular",
      emails: [{ subject: digest.subject, from_name: FROM_NAME, from: FROM_EMAIL, content: digest.html }],
      groups: [groupId],
    },
  });
  const id = created.data.id;
  await ml(`/campaigns/${id}/schedule`, { method: "POST", body: { delivery: "instant" } });
  log(`sent campaign ${id}: "${digest.subject}"`);
};

export const config = { schedule: "0 15,16 * * 2" };

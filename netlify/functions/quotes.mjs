// Netlify Function: live price + market cap for the public comps tickers.
// GET /api/quotes[?set=ccaas|compliance]  →  { asOf, quotes: { TICKER: { price, mcap } }, errors: { TICKER: message } }
//
// Requires the FINNHUB_API_KEY environment variable (set in Netlify → Site configuration →
// Environment variables). The key never reaches the browser.
// Responses are cached on Netlify's CDN for 10 minutes so repeated clicks from many
// visitors stay well under Finnhub's free-tier limit (60 calls/minute).

import { fetchTicker } from "../lib/finnhub.mjs";

// Only these ticker sets can be requested, which keeps the endpoint from being used as an open proxy.
const SETS = {
  ccaas: ["FIVN", "RNG", "NICE", "ZM", "EGHT"],
  compliance: ["ULS", "LDOS", "CACI", "PSN", "SAIC", "KTOS"],
};

function json(body, status, cacheSeconds) {
  const headers = {
    "Netlify-Vary": "query=set",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate",
  };
  if (cacheSeconds) {
    headers["Netlify-CDN-Cache-Control"] = `public, durable, s-maxage=${cacheSeconds}, stale-while-revalidate=120`;
  }
  return new Response(JSON.stringify(body), { status, headers });
}

export default async (req) => {
  const set = (req && new URL(req.url).searchParams.get("set")) || "ccaas";
  const TICKERS = SETS[set];
  if (!TICKERS) return json({ error: "Unknown ticker set." }, 400, 0);
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return json({ error: "Live data is not configured." }, 503, 0);

  const results = await Promise.allSettled(TICKERS.map(t => fetchTicker(t, key)));
  const quotes = {};
  const errors = {};
  let latest = 0;
  results.forEach((r, i) => {
    const t = TICKERS[i];
    if (r.status === "fulfilled") {
      quotes[t] = { price: r.value.price, mcap: r.value.mcap };
      if (r.value.quoteTime > latest) latest = r.value.quoteTime;
    } else {
      errors[t] = String(r.reason && r.reason.message || r.reason);
    }
  });

  if (!Object.keys(quotes).length) return json({ error: "Live data is temporarily unavailable.", errors }, 502, 0);
  // asOf = time of the most recent quote (market time), not the time of the request.
  return json({ asOf: new Date(latest || Date.now()).toISOString(), quotes, errors }, 200, 600);
};

export const config = { path: "/api/quotes" };

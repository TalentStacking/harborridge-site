// Finnhub helpers shared by /api/quotes and the weekly digest. Requires FINNHUB_API_KEY.

const FINNHUB = "https://finnhub.io/api/v1";

async function finnhub(path, key) {
  const res = await fetch(`${FINNHUB}${path}&token=${encodeURIComponent(key)}`);
  if (!res.ok) throw new Error(`Finnhub HTTP ${res.status}`);
  return res.json();
}

// Live price and market cap ($M) for one ticker.
export async function fetchTicker(symbol, key) {
  const [quote, profile] = await Promise.all([
    finnhub(`/quote?symbol=${symbol}`, key),
    finnhub(`/stock/profile2?symbol=${symbol}`, key),
  ]);
  const price = Number(quote && quote.c);
  const sharesM = Number(profile && profile.shareOutstanding); // millions of shares
  if (!(price > 0)) throw new Error("no price returned");
  // Market cap ($M) from the live price; fall back to Finnhub's own market cap if shares are missing.
  const mcap = sharesM > 0 ? price * sharesM : Number(profile && profile.marketCapitalization);
  if (!(mcap > 0)) throw new Error("no market cap returned");
  return { price, mcap, quoteTime: quote.t ? quote.t * 1000 : null };
}

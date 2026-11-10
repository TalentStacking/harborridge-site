// Read a Google Sheet range from a Netlify function, with no npm dependencies.
//
// Auth, in order of preference:
//   GOOGLE_SERVICE_ACCOUNT_JSON  the service account key file (JSON) pasted as the value;
//                                the sheet must be shared with the account's client_email (Viewer).
//   GOOGLE_SHEETS_API_KEY        a plain API key; only works if the sheet is shared as
//                                "Anyone with the link can view".

import { createSign } from "node:crypto";

const SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
let cachedToken = null; // { token, exp }

function b64url(input) {
  return Buffer.from(input).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function serviceAccountToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp - 60 > now) return cachedToken.token;
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email, scope: SCOPE, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
  }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const sig = signer.sign(sa.private_key.replace(/\\n/g, "\n"), "base64")
    .replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${sig}`,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Google auth failed: ${data.error_description || data.error || res.status}`);
  cachedToken = { token: data.access_token, exp: now + (data.expires_in || 3600) };
  return cachedToken.token;
}

// Returns the range as an array of rows (formatted values, as shown in the sheet).
export async function getSheetValues(sheetId, range) {
  const url = new URL(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}`);
  const headers = {};
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    const sa = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    headers.Authorization = `Bearer ${await serviceAccountToken(sa)}`;
  } else if (process.env.GOOGLE_SHEETS_API_KEY) {
    url.searchParams.set("key", process.env.GOOGLE_SHEETS_API_KEY);
  } else {
    throw new Error("No Google credentials: set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SHEETS_API_KEY");
  }
  const res = await fetch(url, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(`Sheets API ${res.status}: ${(data.error && data.error.message) || "error"}`);
  return data.values || [];
}

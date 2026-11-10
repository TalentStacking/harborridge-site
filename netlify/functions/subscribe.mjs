// Netlify Function: add an email to the MailerLite "Comparables Weekly" group.
// POST /api/subscribe  { email, website }  →  { ok: true } | { ok: false, error }
//
// The MailerLite key stays server-side (MAILERLITE_API_KEY). No welcome email is sent;
// subscribers get their first email with the next Tuesday digest.
// `website` is a hidden honeypot field: real visitors leave it empty.

import { ml, getGroupId } from "../lib/mailerlite.mjs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

export default async (req) => {
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  let body;
  try { body = await req.json(); } catch { return json({ ok: false, error: "Invalid request" }, 400); }

  // Bots fill every field; pretend it worked and drop it.
  if (body && body.website) return json({ ok: true }, 200);

  const email = String((body && body.email) || "").trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Please enter a valid email address." }, 400);
  }

  if (!process.env.MAILERLITE_API_KEY) return json({ ok: false, error: "Subscriptions are not configured." }, 503);

  try {
    const groupId = await getGroupId();
    // Upsert: creates the subscriber or adds an existing one to the group.
    await ml("/subscribers", { method: "POST", body: { email, groups: [groupId] } });
    return json({ ok: true }, 200);
  } catch (err) {
    console.error("subscribe failed:", err.message, err.details || "");
    const status = err.status === 422 ? 400 : 502;
    return json({ ok: false, error: "Subscription failed." }, status);
  }
};

export const config = { path: "/api/subscribe" };

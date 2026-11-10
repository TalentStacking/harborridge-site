// MailerLite API helpers shared by the subscribe and weekly-digest functions.
// Uses the current MailerLite API (connect.mailerlite.com). Requires MAILERLITE_API_KEY.

const API = "https://connect.mailerlite.com/api";
export const GROUP_NAME = "Comparables Weekly";

export async function ml(path, { method = "GET", body } = {}) {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key) throw new Error("MAILERLITE_API_KEY is not set");
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = { raw: text }; }
  if (!res.ok) {
    const msg = (data && data.message) || `HTTP ${res.status}`;
    const err = new Error(`MailerLite ${method} ${path}: ${msg}`);
    err.status = res.status;
    err.details = data && data.errors;
    throw err;
  }
  return data;
}

// Group ID for "Comparables Weekly". MAILERLITE_GROUP_ID overrides the name lookup.
let cachedGroupId = null;
export async function getGroupId() {
  if (process.env.MAILERLITE_GROUP_ID) return process.env.MAILERLITE_GROUP_ID;
  if (cachedGroupId) return cachedGroupId;
  const res = await ml(`/groups?limit=100&filter[name]=${encodeURIComponent(GROUP_NAME)}`);
  const group = (res.data || []).find(g => g.name.trim().toLowerCase() === GROUP_NAME.toLowerCase());
  if (!group) throw new Error(`MailerLite group "${GROUP_NAME}" not found`);
  cachedGroupId = String(group.id);
  return cachedGroupId;
}

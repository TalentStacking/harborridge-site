# Vertical: AI

- Vertical name (for commit message): AI
- Page: comparables/ai.html (URL /comparables/ai)
- Slack channel: none. Skip every Slack read and post step for this vertical.

## Deal sources
1. web-search: last 7 days. Queries to run (each separately): "AI startup acquired", "acquires AI company ARR", "AI acquisition annualized revenue", "agrees to acquire AI agent startup", "AI coding startup acquired", "AI infrastructure startup acquired", "Salesforce to acquire AI", "ServiceNow to acquire", "NVIDIA to acquire", "OpenAI acquires", "Anthropic acquires", "Databricks acquires", "Snowflake acquires". Use mode "extended" when results are thin.
2. pitchbook / inven: Inven deal search, dealType acquisition, merger; last 7 days; US targets; target description "artificial intelligence, AI agents, generative AI, LLM, machine learning platform, AI infrastructure software". Keep only deals with a reported deal value.
3. sites: The Information and Axios Pro deal coverage (via search results), startupsacquired.com AI acquisitions report, Business Wire, GlobeNewswire, PR Newswire, SEC 8-K filings of public acquirers.

## Fit rules
US TARGETS ONLY: the target must be headquartered in the United States (the buyer can be anywhere). Skip any deal whose target is based outside the US, and list it in the report as "Non-US, not added".
SCOPE: deals announced 2025 onward.
PRICE NOT REQUIRED (AI page only): add every control acquisition of a US AI-native company, with or without a disclosed price. If a price was disclosed or credibly reported, fill ev; if revenue, ARR or EBITDA is also disclosed, fill the multiple, otherwise set rev, ev_rev, ebitda, ev_ebitda to null and say "Revenue not disclosed, so no multiple." If no price, set ev to null too and start the desc with "Terms not disclosed." The page shows these without a value and leaves them out of the medians. NOT added: licensing-plus-hiring deals and minority stakes (report only), and dev tools that are not AI-native (e.g. JavaScript runtimes, SDK generators, Python linters, git storage).
FIT if the target is an AI-native company whose core product is AI: AI applications and agents (AI customer service, AI assistants, AI research and analytics), AI model platforms and routing, AI developer tools (AI coding), AI infrastructure and MLOps software.
NOT a fit: software companies that merely add AI features (that is Software), AI services and consulting firms (that is Technology Services), chips and hardware, data centers and GPU clouds, venture rounds and minority stakes.

## Page placement
- On the page: all control acquisitions and take-privates of US AI-native companies, priced or not.
- Report only: minority stakes, venture rounds, licensing-plus-hiring (acqui-hire) deals, talks not yet signed.

## Page rules
DEALS entry example:
{date:"2025-03-10", target:"Moveworks", acquirer:"ServiceNow", buyer_type:"Strategic", ev:2850.0, rev:100, ev_rev:28.5, ebitda:null, ev_ebitda:null, vertical:"Enterprise AI Assistants &amp; Agents", categories:["AI Applications"], desc:"$2.85B in cash and stock. Multiple on annual recurring revenue of just over $100M. Rationale: ServiceNow adds an AI assistant and enterprise search front end across IT, HR and finance workflows.", url:"https://...", included:true},
desc: one short description that says whether the price and revenue were disclosed or reported, states the multiple's basis when it is not trailing revenue (ARR, current-year or next-year estimate), then " Rationale: " and one sentence on why the buyer did the deal. Never mention any data source (report, bank, newsletter or database) anywhere on the page.
buyer_type (only these three): "Strategic", "Private equity", "PE-backed strategic" (acquisition by a sponsor-owned company; name the sponsor in acquirer, e.g. "Proofpoint (Thoma Bravo)").
ev: enterprise value in US$M (equity value plus net debt when both are given). rev / ebitda: the figure the multiple is based on, if disclosed; otherwise null with ev_rev / ev_ebitda filled from the stated multiple.
No outlier exclusions: every deal with a multiple counts in the medians (per Cy, Nov 2026). Do not add mult_excl.
categories (only these two, one per deal): "AI Applications" (AI agents and apps sold to end users), "AI Infrastructure & Developer Tools" (model platforms, routing, AI coding, MLOps, AI infrastructure software).
Dates: announcement date; if only the month is known, use the first of that month.
Write "&amp;" for "&" inside vertical, acquirer and desc text.
Methodology line format: "Last updated: <Month D, YYYY>".
Hub card stat line: "<N> private deals · 7 public comps · <X.X>x median private EV/Rev" (median over all deals with ev_rev).

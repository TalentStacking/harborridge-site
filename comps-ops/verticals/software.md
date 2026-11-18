# Vertical: Software

- Vertical name (for commit message): Software
- Page: comparables/software.html (URL /comparables/software)
- Slack channel: none. Skip every Slack read and post step for this vertical.

## Deal sources
1. web-search: last 7 days. Queries to run (each separately): "software company to be acquired", "SaaS acquisition enterprise value", "take-private software per share in cash", "agrees to acquire software company", "acquires SaaS company ARR", "software acquisition times revenue", "cybersecurity company acquired enterprise value", "vertical software acquired", "Thoma Bravo acquires", "Vista Equity acquires", "Francisco Partners acquires", "Hg acquires", "Bending Spoons acquires", "Salesforce to acquire", "SAP to acquire". Use mode "extended" when results are thin.
2. standing take-private watch (every run): check whether any US-listed software company announced a definitive agreement to be acquired in the last 7 days (search "definitive agreement to be acquired" software, and SEC 8-K / DEFM14A / SC 14D9 filings via search). Take-privates almost always disclose enough to compute a multiple.
3. pitchbook / inven: Inven deal search, dealType acquisition, buyout_lbo, merger; last 7 days; US targets; target description "software, SaaS, enterprise applications, infrastructure software, data platforms, cybersecurity software, vertical software". Keep only deals with a reported deal value.
4. sites: softwareequity.com/saas-ma-deal-database (deal list, no multiples: use it only to find candidates, then look for terms elsewhere); First Analysis SaaS research (firstanalysis.com/research, monthly "vertical-saas" notes list notable deals with EV/revenue); Kroll Global Software Sector Update and Cybersecurity Sector Update (quarterly, top deals with EV/LTM revenue); Business Wire, GlobeNewswire, PR Newswire.

## Fit rules
US TARGETS ONLY: the target must be headquartered in the United States (the buyer can be anywhere). Skip any deal whose target is based outside the US, and list it in the report as "Non-US, not added".
SCOPE: deals announced 2025 onward.
MULTIPLES REQUIRED: add a deal ONLY if an EV / revenue (or EV / ARR) or EV / EBITDA multiple was disclosed, or can be computed from a disclosed enterprise value and a disclosed revenue, ARR or EBITDA figure. Deals without valuation data are NOT added; list them in the report as "No multiple, not added".
FIT if the target is mainly a software product company: enterprise applications, infrastructure and data software, cybersecurity software, vertical software, or SMB software.
NOT a fit: IT services and consulting (that is Technology Services), CCaaS / UCaaS / CX software (that is CCaaS & UCaaS), compliance audit firms and GRC services (that is IT & Cyber Compliance), hardware, semiconductors, AI model labs, fintech lenders and payment processors, consumer apps, venture rounds.

## Page placement
- On the page: control acquisitions and take-privates with a disclosed or computable multiple.
- Report only: everything else (minority stakes, venture rounds, deals without multiples).

## Page rules
DEALS entry example:
{date:"2026-10-20", target:"Braze", acquirer:"Salesforce", buyer_type:"Strategic", ev:5660.0, rev:834, ev_rev:6.8, ebitda:null, ev_ebitda:null, vertical:"Customer Engagement Platform", categories:["Enterprise Applications"], desc:"Take-private at $47.50 per share, a 58% premium. Multiple on trailing twelve-month revenue of $834M, growing 27%. Rationale: Salesforce adds a real-time, mobile-first engagement engine that its Marketing Cloud lacked.", url:"https://...", included:true},
desc: one short description that states the multiple's basis when it is not trailing revenue (ARR, current-year or next-year estimate), then " Rationale: " and one sentence on why the buyer did the deal. Never mention any data source (report, bank, newsletter or database) anywhere on the page.
buyer_type (only these three): "Strategic", "Private equity", "PE-backed strategic" (acquisition by a sponsor-owned company; name the sponsor in acquirer, e.g. "Proofpoint (Thoma Bravo)").
ev: enterprise value in US$M (equity value plus net debt when both are given). rev / ebitda: the figure the multiple is based on, if disclosed; otherwise null with ev_rev / ev_ebitda filled from the stated multiple.
No outlier exclusions: every deal with a multiple counts in the medians (per Cy, Nov 2026). Do not add mult_excl.
categories (only these six, one per deal): "Enterprise Applications", "Infrastructure & Data", "Cybersecurity", "Vertical Software", "SMB/Consumer", "AI" (AI-native companies whose core product is AI: AI coding, model platforms and routing, AI agents, AI customer service).
Dates: announcement date; if only the month is known, use the first of that month.
Write "&amp;" for "&" inside vertical, acquirer and desc text.
Methodology line format: "Last updated: <Month D, YYYY>".
Hub card stat line: "<N> private deals · 25 public comps · <X.X>x median private EV/Rev" (median over all deals with ev_rev).

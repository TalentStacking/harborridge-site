# Vertical: Technology Services

- Vertical name (for commit message): Technology Services
- Page: comparables/technology-services.html (URL /comparables/technology-services)
- Slack channel: #tech-services-deals (C0C1KBVSF24)

## Deal sources
1. web-search: last 7 days. Queries to run (each separately): "acquires AI consultancy", "acquires data and AI consulting", "AI services Series A", "AI implementation raises", "GenAI consultancy acquired", "agentic AI services acquired", "Databricks partner acquired", "Snowflake partner acquired", "Salesforce partner acquisition", "ServiceNow partner acquisition", "SAP partner acquisition", "Oracle cloud consultancy acquired", "Google Cloud partner investment", "Microsoft partner growth investment", "Palantir partner acquired", "digital engineering acquisition", "IT consulting acquisition", "managed IT services acquired".
2. standing acquirer watchlist (last 60 days, every run): search "<name> acquires" / "<name> acquisition" for OpenAI Deployment Company, Ode (Anthropic), Anthropic, Microsoft AI deployment business, Google Cloud, Palantir, Accenture, Deloitte, IBM, AlixPartners, CGI, Capgemini, Cognizant, Infosys, TCS, Wipro, Nebius, CoreWeave. Any new hit outside the 7-day window still counts (label it "caught by watchlist").
3. pitchbook / inven: Inven deal search, dealType acquisition, funding_round, buyout_lbo, recapitalization, growth_expansion; last 7 days; US targets; target description "AI implementation and consulting, data and analytics consulting, cloud and SaaS platform partner (Databricks, Snowflake, Salesforce, ServiceNow, SAP, Oracle, Microsoft, Google Cloud, Palantir), digital and product engineering, IT consulting and managed IT services".
4. sites: Clearsight Advisors quarterly Digital, AI and Cloud Update (clearsightadvisors.com/newsletter-archive) when a new one is published; Accenture newsroom; consulting.us M&A news; Business Wire, GlobeNewswire, PR Newswire.

## Slack post (always, one message, channel C0C1KBVSF24)
Header "*Tech & AI Services Deal Digest, week of <Mon DD to DD, YYYY>*", a 1 to 2 sentence headline, then deals grouped under (omit empty ones): "AI Lab & Hyperscaler Buyers", "AI Services", "Data & Analytics", "Cloud & SaaS Platform Partners", "Digital Engineering & IT Consulting", "Financings ($5M+)". Per deal: *Target / Buyer or Investor* (sponsor or ticker), one sentence on the target, one sentence rationale, stats (EV, revenue, multiples, round size, or "not disclosed"), press release link, and "On site: added" or "On site: not added (<reason, e.g. non-US, venture round>)". Include non-US and venture deals in Slack (they are market signal) even though they do not go on the page; skip seed and rounds under $5M. Tag "Tier 1 target" when the target or funded company is on HRC's AI services Tier 1 list (Distyl AI, Tribe AI, Cadre AI, Eliza, Tenex, AuxoAI, Artium, Northslope, Covasant, NeenOpal, forgd, Ciridae, Foxtrot Services). Close with "Standing watchlist:" (hits, or "no new activity in the last 60 days") and 2 to 4 "What to watch" bullets. If nothing qualified, post exactly: no transactions. Keep under 5,000 characters (overflow in a thread reply). Post to no other channel. No Zoho writes.

## Fit rules
US TARGETS ONLY: the target must be headquartered in the United States (the buyer can be anywhere). Skip any deal whose target is based outside the US, and list it in the report as "Non-US, not added".
FIT if the target is mainly a services firm in emerging tech: AI implementation / forward-deployed engineering, data and analytics consultancies, cloud and SaaS platform partners (Databricks, Snowflake, Salesforce, SAP, Oracle, Google Cloud, Microsoft, Palantir, ServiceNow, Workday), digital and product engineering, and technology-enabled IT consulting or managed IT. Include growth or minority investments into such firms (say so in desc, as with Climb / RLH).
NOT a fit: software or SaaS product companies, AI model or chip companies, pure staffing, BPO / contact center (that is CCaaS & UCaaS), cyber and compliance firms (that is IT & Cyber Compliance), venture rounds into startups.

## Page placement
- On the page: M&A, majority deals, and growth or minority investments in services firms.
- Report only: venture / seed / Series rounds (list as "Venture rounds, not added").

## Page rules
DEALS entry example:
{date:"2026-09-16", target:"Climb", acquirer:"RLH Equity Partners", buyer_type:"Private equity", ev:null, rev:null, ev_rev:null, ebitda:null, ev_ebitda:null, vertical:"Data & AI Consulting (Databricks)", categories:["AI Services", "Data & Analytics"], desc:"Growth investment in a Dallas-based, Databricks-native data and AI consultancy. Rationale: backs data and AI delivery growth.", url:"https://...", included:true},
desc: one short description, then " Rationale: " and one sentence on why the buyer did the deal. Never mention Clearsight (or any other source) anywhere on the page.
buyer_type (only these four): "Strategic", "Private equity", "PE-backed strategic" (add-on by a sponsor-owned platform; name the sponsor in acquirer, e.g. "Argano (Trinity Hunt Partners)"), "AI lab" (OpenAI Deployment Co, Ode).
ev: only if reported (US$M); otherwise null. Use the upfront or initial enterprise value; put earnouts and the headline "up to" figure in desc. Use enterprise value (equity value plus net debt) when the buyer gives both.
Valuation data: for every deal with a reported value, look hard for the target's revenue and EBITDA before leaving them null: the acquirer's press release, investor presentation or FAQ, earnings call, SEC 8-K / 10-Q / 10-K acquisition note, stock exchange filings for non-US listed buyers (India, France, Germany, Japan, etc., including local-language releases), and reputable trade coverage. Fill rev / ebitda (US$M, trailing; forward only if that is all that is disclosed, and say "multiples on 2026E" in desc), then ev_rev = ev / rev and ev_ebitda = ev / ebitda (1 decimal). Put the revenue and EBITDA facts in desc. Never use third-party database estimates (ZoomInfo, RocketReach, "estimated revenue").
Outliers: if ev_rev is above 10x or ev_ebitda above 30x, keep the numbers but add mult_excl:true and say in desc "Revenue multiple shown but excluded from medians as an outlier." 
Also re-check older deals on the page that have ev but null rev when new disclosures appear (e.g. the acquirer's next quarterly filing).
categories (only these five): "AI Services", "Data & Analytics", "Cloud & SaaS Platforms", "Digital Engineering", "IT Consulting & MSP".
Write "&amp;" for "&" inside acquirer names (e.g. "Ode (Anthropic, Blackstone, H&amp;F)").
If the page methodology "Deal terms." paragraph lists example disclosed values, add a new disclosed deal there only if it is among the largest.
Methodology line format: "Last updated: <Month D, YYYY>, 5:00 PM PT".
Hub card stat line: "<N> private deals · 6 public comps · <X.X>x median public EV/EBITDA" (keep the public numbers unless the quarterly task changed them).

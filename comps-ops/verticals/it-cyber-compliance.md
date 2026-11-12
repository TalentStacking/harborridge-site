# Vertical: IT & Cyber Compliance

- Vertical name (for commit message): IT & Cyber Compliance
- Page: comparables/it-cyber-compliance.html (URL /comparables/it-cyber-compliance)
- Slack channel: #cyber-and-compliance-deals (C0B6NKBMGB1)

## Deal sources
1. web-search: the queries under "What to find" below, last 7 days.
2. pitchbook / inven: Inven deal search (build_deal_search, build_columns, run_deal_search), dealType acquisition, funding_round, buyout_lbo, recapitalization, growth_expansion; deal date last 7 days; North America + Europe; two target descriptions run separately: (1) "IT security and cyber compliance company specializing in GRC, audit services, and frameworks like SOC 2, HITRUST, ISO 27001, FedRAMP, CMMC, HIPAA, including MSSPs and managed compliance services" and (2) "IT services, IT consulting, managed IT services (MSP), govtech, defense IT". Prefer Inven deal stats when present.
3. sites: SecurityWeek M&A tracker, Cybersecurity Dive, ChannelE2E, CRN, MSSP Alert, Channel Futures, GovCon Wire, Washington Technology, Business Wire, GlobeNewswire, PR Newswire, SEC 8-K filings.
Also read #cyber-and-compliance-deals for the last 8 days first: other agents post "PitchBook M&A" alerts there. Use those as extra candidates, and do not re-report deals already posted in a prior digest.

## What to find (last 7 days)
The Slack digest covers HRC's full cyber / compliance / IT services universe; only the "Fit rules" subset goes on the page.
- Core cyber and compliance: TICC certifiers and assessors (LRQA, SGS, Bureau Veritas, Intertek, Amtivo, Phenna, etc.); CMMC RPOs, C3PAOs, federal compliance assessors (A-LIGN, Schellman, Fortreum, ControlCase, StackArmor, etc.); GRC SaaS and compliance automation (Drata, Vanta, Secureframe, Sprinto, Thoropass, Hyperproof, RegScale, etc.); FedRAMP managed compliance; compliance-focused MSPs / MSSPs (CMMC, FedRAMP, SOC 2, HITRUST, HIPAA, ISO 27001, PCI).
- Broader HRC coverage (Slack digest only, not the page unless it meets Fit rules): IT services and IT consulting (founder-led, $5 to 75M revenue), MSPs, MSSPs, govtech, defense IT and federal cyber.
- Geography: North America and Europe, primarily US targets; cross-border when buyer or target is US.
- Counts: M&A, mergers, divestitures, take-privates, LBOs / MBOs / recaps, PE growth or minority investments of $5M+, capital raises of $10M+. Skip seed and small Series A under $10M unless squarely compliance.
Search queries to run (separately): "CMMC acquisition", "C3PAO acquired", "FedRAMP acquisition", "SOC 2 audit firm acquired", "HITRUST assessor acquired", "ISO certification body acquired", "GRC software acquisition", "compliance automation raises", "TICC acquisition", "MSSP acquisition", "MSP acquisition", "managed services provider acquires", "IT services acquisition", "govtech acquisition", "federal IT acquisition", "defense IT acquisition", "A-LIGN acquires", "Schellman acquires", "Vanta acquires", "Drata acquires", "LRQA acquires", plus the sites above with site: filters.

## Slack post (always, one message, channel C0B6NKBMGB1)
Header "*Cyber & Compliance Deal Digest, week of <Mon DD to DD, YYYY>*", then a 1 to 2 sentence headline, then deals grouped under these headers (omit empty ones): "Compliance / GovTech", "Cybersecurity", "IT Services & MSP", "Defense IT", "Other notable". Per deal: *Target / Buyer* (ticker or sponsor), one sentence on the target, one sentence rationale, stats (EV, revenue, EBITDA, multiples or "not disclosed"), press release link, and "On site: added" or "On site: not a page fit". Tag compliance-critical deals (CMMC, FedRAMP, HIPAA, SOC 2, HITRUST, ISO 27001, govtech) with "Compliance-critical". Close with 2 to 4 "What to watch" bullets. If nothing qualified, post exactly: no transactions. Keep under 5,000 characters (overflow in a thread reply). Post to no other channel.

## Zoho enrichment (Leads module only; Accounts is not accessible)
For each deal in the Slack digest, search Zoho Leads (searchRecords, word = company name) for the target / funded company and the buyer / lead investor.
- Target found: set Priority = Low.
- Buyer or lead investor found: set Strategic = true; set Industry to Cybersecurity (cyber / MSSP / MDR / FedRAMP / CMMC focus), Compliance (TICC / GRC / pure compliance), Technology (IT services / MSP buyer) or Defense (defense IT / federal cyber); add a note (createNotesModule, Parent_Id module Leads) titled "Deal: <Buyer> -> <Target> (<Mon YYYY>)" with the deal facts and press release URL.
- Neither found: say so in the report. Never create new Leads.

## Fit rules
FIT if the target is mainly in IT or cyber compliance: compliance audit and assessment firms (3PAO, C3PAO, CMMC RPO, SOC / ISO / HITRUST / PCI / IRAP / FedRAMP assessors), compliance and GRC software, GRC-as-a-service and cyber compliance advisory, CMMC / FedRAMP specialists, TICC certification platforms, and offensive security bought by a compliance player (e.g. A-LIGN / Pathfynder). Include growth or minority investments into such firms (say so in Note, as with Insight Assurance / Marlin Equity).
NOT a fit: general MSPs / MSSPs, SOC / MDR shops, federal IT integrators and defense contractors without a compliance core, AI-security or endpoint product companies, cyber insurtech, training / certification-of-people companies, megacap tuck-ins unrelated to compliance.


## Page placement
- On the page: M&A, majority deals, and growth or minority investments in services firms.
- Report only: pure venture / seed / Series rounds into software startups (list as "Venture rounds, not added").

## Page rules
DEALS entry example:
{date:"2026-11-09", target:"Insight Assurance", acquirer:"Marlin Equity Partners", ev:null, rev:null, ev_rev:null, ebitda:null, ev_ebitda:null, vertical:"Audit / Assessment (SOC, CMMC, FedRAMP)", categories:["Audit & Assessment", "CMMC / FedRAMP"], desc:"Growth investment in a SOC, CMMC, FedRAMP and HITRUST attestation firm; its first institutional capital.", url:"https://...", included:true},
vertical labels: "Audit / Assessment (SOC, ISO)", "CMMC Compliance Services", "Compliance SaaS (GRC)", "GRC Services", "Cyber Services (Offensive Security)", "TICC (Europe)".
categories (only these six): "Audit & Assessment" (assessors, auditors, attestation, certification bodies), "Compliance SaaS" (compliance / GRC software), "Cyber & GRC Services" (GRC advisory, managed compliance, cyber services), "CMMC / FedRAMP" (CMMC, FedRAMP, NIST 800-171, DoD / federal compliance), "TICC" (testing, inspection, certification and compliance roll-ups and global TIC players), "Europe".
Methodology line format: "Last updated: <Month D, YYYY>, 5:00 PM PT".
Hub card stat line: "<N> private deals · <X.X>x median EV/EBITDA".

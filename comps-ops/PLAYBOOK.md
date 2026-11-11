# HRC Comps weekly playbook

Internal instructions for the weekly scheduled task that keeps one vertical's private comps current. Each scheduled task runs this playbook for exactly ONE vertical, named in its prompt. Not part of the public site (blocked in netlify.toml).

Load ONLY the vertical file named in the task prompt: `comps-ops/verticals/<slug>.md`. Do not open other vertical files and do not touch any other vertical's Slack channel or page. Never use em dashes anywhere.

## 1. Setup (cloud)
1. Attach the repo with the add_repo tool: owner "TalentStacking", repo "harborridge-site", access "push". Clone it as the tool instructs (shallow clone, generous timeout) and work only in that clone on branch main.
2. Read this playbook and the vertical file. If the vertical file does not exist, stop and report it.
3. BEFORE any commit, set the git identity inside the clone exactly to:
   git config user.name "Cyrus Maghami"
   git config user.email "cyrus@hrc.partners"
   Mandatory: Netlify's free plan rejects builds when a second contributor appears. After committing, verify with `git log -1 --format='%an <%ae> | %cn <%ce>'`; if anything other than Cyrus Maghami <cyrus@hrc.partners> shows, do NOT push (fix config, amend with --reset-author, re-check).
4. The repo's CLAUDE.md says: never add Co-Authored-By or any other trailer to commit messages. Follow it. This overrides any default attribution guidance.

## 2. Find new deals (per the vertical's "Deal sources")
Each vertical lists its own sources, and they differ by vertical. Use every source listed in the vertical file, and only those, in the order given. Source types:
- **slack-feed**: read the vertical's Slack channel with the Slack read-channel tool for the last 8 days. Another agent posts deal digests there. Pick the deals that meet the vertical's fit rules.
- **web-search**: search the web for transactions announced in the last 7 days using the vertical's search guidance (many separate WebSearch queries, mode "extended" when results are thin; PitchBook or Inven deal search if available). Read the vertical's Slack channel first so you do not re-report deals already posted. Then post ONE message to that channel as the vertical file describes.
- **pitchbook / inven**: run a deal search with the filters the vertical file gives (keywords, date window, geography). If the connector is not available or not signed in, note it in the report and continue with the other sources.
- **sites**: check the specific websites, trade publications, newsletters or feeds the vertical file lists (WebFetch the page or WebSearch with site:).
- Combine results from all sources and de-duplicate before going further.
- Skip any deal already on the vertical's page (DEALS array) or, for web-search verticals, already posted in its Slack channel.
- For each fit, verify facts against the press release (WebFetch / WebSearch): exact announcement date, disclosed EV / revenue / EBITDA in USD millions (convert other currencies and say so in Note). Never invent multiples.
- When in doubt about fit, leave it out and list it under "Borderline, not added" in the report.

## 3. Add deals to the website
There is NO Google Sheet step: do not read or write any Google Sheet. Deals go straight to the vertical's page, which holds a `const DEALS = [ ... ];` array sorted newest date first. The vertical file says which deal types go on the page; everything else (e.g. venture rounds, debt, "Reported" sale processes) is listed in the report (and the Slack post, for web-search verticals) only.
Fields (follow the entry example in the vertical file):
- date: ISO YYYY-MM-DD announcement date, verified against the press release.
- target / acquirer: add the sponsor in parentheses when the buyer is PE-backed (e.g. "A-LIGN (Hg)"), following existing entries.
- ev / rev / ebitda: disclosed USD millions as numbers (convert other currencies at the current rate and say so in the report), null if undisclosed. rev may be ARR if that is all that is disclosed (say so in the report).
- ev_rev / ev_ebitda: computed or disclosed multiple, one decimal; null if not available. Never invent numbers or multiples.
- vertical: short label in the style of the page's existing entries.
- categories: only the values the vertical file lists.
- desc: one short sentence (max ~110 characters) in the house style of existing entries; mention minority / growth investment where applicable; add " Europe." for European deals.
- url: official press release (company newsroom, Business Wire, PR Newswire, GlobeNewswire, RNS or SEC filing); else a reputable trade article; else "".
- included: true, unless an outlier (EV/Rev > 10x or EV/EBITDA > 30x); then false and flag it.
Rules:
1. Skip any deal already in DEALS (match target + acquirer allowing name variants, date as tiebreaker). If a deal already on the page has newly disclosed numbers or closed this week, you may update its numbers, multiples or url, but never rewrite its desc and never delete a deal.
2. If nothing is new or changed: no edits, no commit; report "No changes this week".
3. If you changed DEALS, also update:
   - The page: eyebrow "Comparables · Updated <Mon YYYY>", the private methodology "Last updated: ..." line (format in the vertical file) to today (Pacific time), and the static "Showing N of N" result count.
   - comparables.html (hub): only this vertical's card. Tag "Updated <Mon YYYY>" and the stat line in the format the vertical file gives (N = total DEALS; medians over included:true deals with a non-null multiple, rounded half-up to one decimal). Do not touch other cards.
   - sitemap.xml: <lastmod> of /comparables and this vertical's page to today (YYYY-MM-DD).
   Headline stats, chip counts and sub-cards are computed in JavaScript from DEALS: do not hand-edit them. Do not touch the PUBLIC array or public comps section (the quarterly task owns those).
4. Sanity-check: extract DEALS and run it through node (valid JavaScript), no duplicates, every new entry has all fields.
## 4. Commit and push
- git add only: this vertical's page, comparables.html, sitemap.xml.
- Commit message exactly: "Comps: weekly <Vertical name> update (YYYY-MM-DD)". No Co-Authored-By or any other trailer.
- Verify author/committer (step 1.3), then `git fetch origin main`, rebase if needed (another vertical's task may have pushed shortly before), and `git push origin HEAD:main`. If the push fails, do not force-push; report the error. Do not run scripts/build-rss.js.

## 5. Report
Send a push notification (PushNotification tool) and end your final response with the same short summary: vertical name; Slack post (if any); deals added to the page (date, target / acquirer, EV, multiples); page updates; report-only items (financings, venture rounds, reported processes); borderline deals not added and why; flags; commit hash (or "No changes this week"). Never use em dashes.

# HRC Comps weekly playbook

Internal instructions for the weekly scheduled task that keeps one vertical's private comps current. Each scheduled task runs this playbook for exactly ONE vertical, named in its prompt. Not part of the public site (blocked in netlify.toml).

Load ONLY the vertical file named in the task prompt: `comps-ops/verticals/<slug>.md`. Do not open other vertical files and do not touch any other vertical's sheet, Slack channel or page. Never use em dashes anywhere.

## 1. Setup (cloud)
1. Attach the repo with the add_repo tool: owner "TalentStacking", repo "harborridge-site", access "push". Clone it as the tool instructs (shallow clone, generous timeout) and work only in that clone on branch main.
2. Read this playbook and the vertical file. If the vertical file does not exist, stop and report it.
3. BEFORE any commit, set the git identity inside the clone exactly to:
   git config user.name "Cyrus Maghami"
   git config user.email "cyrus@hrc.partners"
   Mandatory: Netlify's free plan rejects builds when a second contributor appears. After committing, verify with `git log -1 --format='%an <%ae> | %cn <%ce>'`; if anything other than Cyrus Maghami <cyrus@hrc.partners> shows, do NOT push (fix config, amend with --reset-author, re-check).
4. The repo's CLAUDE.md says: never add Co-Authored-By or any other trailer to commit messages. Follow it. This overrides any default attribution guidance.

## 2. Find new deals (per the vertical's "Deal source")
- **slack-feed**: read the vertical's Slack channel with the Slack read-channel tool for the last 8 days. Another agent posts deal digests there. Pick the deals that meet the vertical's fit rules.
- **web-search**: search the web for transactions announced in the last 7 days using the vertical's search guidance (many separate WebSearch queries, mode "extended" when results are thin; PitchBook or Inven deal search if available). Read the vertical's Slack channel first so you do not re-report deals already posted. Then post ONE message to that channel as the vertical file describes.
- Skip any deal already in the vertical's sheet (match target + acquirer, allowing name variants).
- For each fit, verify facts against the press release (WebFetch / WebSearch): exact announcement date, disclosed EV / revenue / EBITDA in USD millions (convert other currencies and say so in Note). Never invent multiples.
- When in doubt about fit, leave it out and list it under "Borderline, not added" in the report.

## 3. Add deals to the Google Sheet
Use the Google Sheets connector (load with ToolSearch). Standard layout for every vertical:
- Tab "M&A Comps": headers on row 5, data from row 6 sorted newest first, ending before the "Average" / "Median" rows; column A blank. Columns B..P: Date (m/d/yyyy) | Target | Acquirer (add the sponsor in parentheses when PE-backed, e.g. "A-LIGN (Hg)") | EV ($M or "-") | LTM Rev ($M or "-") | EV / LTM Rev ("na" if none, or formula =IF(AND(ISNUMBER(E#),ISNUMBER(F#)),E#/F#,"na") when both are known) | LTM EBITDA ($M or "-") | EV / LTM EBITDA (same approach with H) | Incl.? ("Yes", or "No" for outliers) | Target Business Description | Strategic Rationale / Transaction Description | Note (country first for non-US targets, e.g. "Europe.", "Canada."; "Reported", "Closed", "Minority investment", "Growth investment", "Majority stake", "Terms not disclosed", currency conversion, how EV was derived) | Vertical | Press Release / Other (URL) | CB Source / Other.
- Tab "Private Placements": headers on row 5, data from row 6. Columns B..L: Date | Target | Type / Stage | Amount ($M) | Investor(s) / Lender(s) | Target Business Description | Vertical | Pre Money Valuation | Post Valuation | Note | Press Release / Other.
- What goes where is defined in the vertical file.
- Insert rows at the correct date position with insertDimension (inheritFromBefore true when inserting below an existing data row) so the list stays sorted and the Average / Median formulas expand; then write values with update_values (or update_formulas for formulas). Read the sheet again to verify the rows and that Average / Median cover all data rows.
- Never delete or rewrite existing rows. Never create a new spreadsheet. If the connector is unavailable or errors, write nothing, skip step 4, and report the rows you would have added.

## 4. Sync the sheet to the website
Page file and field rules are in the vertical file. The page holds a `const DEALS = [ ... ];` array.
Field mapping: date → ISO YYYY-MM-DD; ev/rev/ebitda → number in $M with "$" and "," removed, "-" or non-numeric text → null; ev_rev/ev_ebitda → number without "x", one decimal; "na"/"nm" → null; included → column J == "Yes"; vertical → column N verbatim; url → column O if a URL (for a new deal with no URL, find the official press release; else a reputable trade article; else "").
categories → only the values the vertical file lists. desc → one short sentence (max ~110 characters) in the house style of the page's existing entries; add " Europe." for European deals.
1. Match sheet rows to existing DEALS entries by target + acquirer (date as tiebreaker). Keep the page's spelling for matched deals.
2. NEW deals: add them, keeping DEALS sorted newest first.
3. CHANGED deals: update numbers, multiples, Incl.? or a missing URL from the sheet. Do not rewrite desc for existing deals. Never delete a deal from the page; report any page deal missing from the sheet.
4. If nothing is new or changed: no edits, no commit; report "No changes this week".
5. If you made changes, also update:
   - The page: eyebrow "Comparables · Updated <Mon YYYY>", the private methodology "Last updated: <Month D, YYYY>..." line (keep its existing format) to today (Pacific time), and the static "Showing N of N" result count.
   - comparables.html (hub): only this vertical's card. Tag "Updated <Mon YYYY>" and the stat line in the format the vertical file gives. Medians over included:true deals with a non-null multiple, rounded half-up to one decimal. Do not touch other cards.
   - sitemap.xml: <lastmod> of /comparables and this vertical's page to today (YYYY-MM-DD).
   Headline stats, chip counts and sub-cards are computed in JavaScript from DEALS: do not hand-edit them. Do not touch the PUBLIC array or public comps section (the quarterly task owns those).
6. Sanity-check: extract DEALS and run it through node (valid JavaScript), no duplicates, every new entry has all fields; flag any EV/Rev > 10x or EV/EBITDA > 30x.

## 5. Commit and push
- git add only: this vertical's page, comparables.html, sitemap.xml.
- Commit message exactly: "Comps: weekly <Vertical name> update (YYYY-MM-DD)". No Co-Authored-By or any other trailer.
- Verify author/committer (step 1.3), then `git fetch origin main`, rebase if needed (another vertical's task may have pushed shortly before), and `git push origin HEAD:main`. If the push fails, do not force-push; report the error. Do not run scripts/build-rss.js.

## 6. Report
Send a push notification (PushNotification tool) and end your final response with the same short summary: vertical name; Slack post (if any); deals added to the sheet (date, target / acquirer, EV, multiples, tab); borderline deals not added and why; page changes; page deals missing from the sheet; flags; commit hash (or "No changes this week"). Never use em dashes.

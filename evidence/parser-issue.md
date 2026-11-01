## Problem and report count

**379 unique reports** from ticket **#4471** concern the shared month-first date parser for day-first tenants. This is separate from the booking-v3 hint bug (#2). Counts cover the supplied export through 2026-10-04, not the live desk.

The shared parser reads MM/DD although these tenants write DD/MM. Example: R-41200 (harbour.dental, app) reports a 7 April reminder sent for 4 July. Day-first tenant app/email reports and booking-v2 form reports belong to this cause; booking-v3 form reports do not.

## Evidence and method

Run `node scripts/analyze.mjs` in the repository. `evidence/counts.json` lists every report ID in each cause group. Deduplicate the 427 export rows by ID first: there are 412 unique reports. Filter mergedInto=4471 and use causes.ts with the tenant directory (locale, form version) and channel, not the browser locale, intake tag, subject or merge target.

- 379 reports across 11 tenants; received 2026-04-01 through 2026-10-04.
- Intake called 356 parser and 23 hint; these are guesses, not cause counts.
- Five reports (R-41202, R-41209, R-41236, R-41344, R-41620) describe a one-day move. They remain included in these 379 per the supplied classification and are footnoted, not counted again as a proven timezone bug. Investigate their wording during reproduction.

## Expected / actual

Expected: a date entered in the tenant's agreed format produces that calendar date on the invite.
Actual: ambiguous day/month values are interpreted month first and produce a different booking date.

## Proposed fix and acceptance checks

Define an unambiguous shared-parser input contract and parse using the tenant's actual date order where local text is accepted. Test day-first locales across app/email/form paths, ambiguous values such as 07/04, invalid month/day values and unaffected month-first locales. Reproduce the five one-day symptoms separately before claiming they are fixed. The hint issue needs its own fix; do not close it with this parser change.

## Desk follow-up

The support queue continues after the merge batch. Keep this issue open until there is fix evidence; recalculate unique report counts on each new export. Do not equate 'known' with resolved.

KB source: `src/routes/kb/incidents/4471-reassessment/+page.svx`.
Rendered page: `build/kb/incidents/4471-reassessment/index.html` (serve `build/` for styles and interactivity).

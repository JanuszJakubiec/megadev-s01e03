## Problem and report count

**33 unique reports** merged into **#4471** concern the misleading booking-v3 date hint. This is a separate bug from the shared parser (#1). Counts cover the supplied export through 2026-10-04, not the live desk.

Booking-v3 displays **MM/DD/YYYY**, but for day-first tenants the form reads dates in the tenant's day-first order. People following the displayed instructions get a different booking date. A shared parser fix alone does not correct this hint mismatch.

## Evidence and method

Run `node scripts/analyze.mjs`. `evidence/counts.json` lists every report ID in this group. Deduplicate export rows by ID and classify using causes.ts and tenant locale/form configuration plus channel, never browser locale, subject or intake tag.

- **33 reports** across **3 tenants**: alder.physio, copper.studio, pale.harbour; received 2026-04-17 through 2026-09-22.
- Only their **form** channel belongs here. Their app/email reports belong to the parser issue.
- Intake tagged 18 hint and 15 parser; the tag is a guess, not the grouping rule.
- R-41230 (copper.studio, form): 1 June versus 6 January.
- R-41241 (alder.physio, form): 8 June versus 6 August.
- R-41251 (pale.harbour, form): 7 January versus 1 July.

## Expected / actual

Expected: following the visible date hint creates a booking for the intended date.
Actual: month-first instructions conflict with day-first form interpretation.

## Proposed fix and acceptance checks

Generate the hint from the same tenant-aware format the form actually accepts. Test booking-v3 for all three affected tenants: enter an ambiguous date by following the displayed hint, submit, and verify the stored date and resulting invite. Cover day-first and month-first tenants and compare booking-v2. Verify parser paths separately in #1; do not merge these issues based on matching subject lines.

## Desk follow-up

Use cause-based triage and update unique report counts on future exports. Keep this independently actionable until the hint fix has passed end-to-end tests. Unknown tenants need investigation, not automatic merging.

KB source: `src/routes/kb/incidents/4471-reassessment/+page.svx`.
Rendered page: `build/kb/incidents/4471-reassessment/index.html` (serve `build/` for styles and interactivity).

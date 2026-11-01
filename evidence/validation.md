# Validation, 2026-11-01

## Commands

- `node scripts/analyze.mjs`: 427 rows, 412 unique report IDs, parser 379 and hint 33; IDs committed in counts.json.
- `npm test`: 4 tests passed, including deduplication, tenant-based classification, intake disagreements and five one-day descriptions, and deterministic signature stamp.
- `npm run check`: zero errors and zero warnings.
- `npm run build`: static adapter successfully rendered the entire KB into build/. See build.log.
- `npm audit --json`: 6 low-severity dependency findings; no moderate, high or critical findings. Full report in npm-audit.json. No force-upgrade performed.

## Browser checks

Managed isolated Chromium against the locally served production build at 127.0.0.1:5174:

- Reassessment at 1440×900 and 390×844; no horizontal document overflow.
- Inspected full-page screenshots of the cause table, expanded weekly timeline data, prose and derived desk stamp.
- Verified stamp DR-B9C6-5AYF is present after hydration.
- Keyboard focus and Enter open the weekly data disclosure.
- Cause table is keyboard-focusable and scrollable on narrow screens, rather than overflowing the page.
- Followed Decision 0002 and changed tenant/channel controls: same tenant with form/app stays apart; form/form merges by shared cause.
- Final browser pass: zero console errors/warnings, zero page errors, no HTTP status >=400. Request-failure checks included separately below.
- No loading, form-submit, remote write, or application error flow was added. The site renders static export data.

Screenshots were inspected in the browser QA artifact directory /tmp/pi-playwright/megadev/ (desktop-final.png, mobile-final.png, decision-interactive.png; final-1440.png and final-390.png repeat the final build).

## Issues encountered

- Relative mdsvex layout paths failed to resolve from nested pages. Resolved the configured layout to an absolute path; the build then passed.
- A narrow-screen table initially widened the document. Added a named keyboard-scrollable table region and code wrapping, then checked both viewports again.
- Development-server HMR briefly produced a hydration mismatch while rebuilding in the same work directory. The independently served production artifact passed repeated hydration and interaction checks with no console warnings.
- The installed browser CLI uses `requests`, not the skill's older `network` command. Repeated the request check with the supported command.

## Later desk update and closure correction

After the first accepted submission, the Challenge page revealed an engineering update: #4471 closed 05 Oct; parser FIXED (`fix(dates): parse dd/mm for eu locales`), hint WON'T FIX (booking-v3 form retired). An initial submission with both issues closed as completed was rejected. Corrected issue #2 to not_planned and documented the different outcomes in issue comments and the signed KB source. Rebuilt the rendered site and repeated 1440×900 / 390×844 checks: no overflow, console/page errors, failed requests or HTTP errors. Inspected resolution-390.png and resolution-1440.png screenshots. Production fixes are reported from the course update, not independently verified here.

## Issued signature correction

The next course check required the exact ticket from start-challenge, not an author-name signature. Retrieved it and placed it in the incident page frontmatter as required. The component now derives desk ref DR-WYDB-5JJY. Re-ran all four tests, type checks (zero errors/warnings), static build and both viewport checks; no console/page/request/HTTP errors or document overflow. Inspected signed-1440.png and signed-390.png including visible keyboard focus. The exact ticket is published only where the Challenge requires the page signature; the local course log is outside this repo.

## Scope and residual risks

This is triage of an exported snapshot, not validation or repair of the underlying production booking system. New reports require a new export and recomputation. The one-day descriptions remain a follow-up uncertainty, not a third verified cause. Historical accepted decision 0001 is unchanged; the new signed record supersedes it. Build dependencies have six low-severity audit findings. No authenticated browser state or course sign-in links are published.

# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03 reassessment

- [Parser issue: 379 reports](https://github.com/JanuszJakubiec/megadev-s01e03/issues/1)
- [Hint issue: 33 reports](https://github.com/JanuszJakubiec/megadev-s01e03/issues/2)
- Signed source: `src/routes/kb/incidents/4471-reassessment/+page.svx`
- Rendered page: `build/kb/incidents/4471-reassessment/index.html`
- Replacement decision: `src/routes/kb/decisions/0002-dedupe-by-cause/+page.svx`
- Reproducible counts and all report IDs: `evidence/counts.json`

The build includes the full site, its CSS and JavaScript. To inspect the desk's view:

```sh
npm ci
npm test
node scripts/analyze.mjs
npm run check
npm run build
python3 -m http.server 5174 --bind 127.0.0.1 --directory build
# Open http://127.0.0.1:5174/kb/incidents/4471-reassessment/
```

Node 24 supports running the analysis and tests directly from the supplied TypeScript logic.
The lockfile pins build dependencies. Build output is committed so reviewers need not install
anything to inspect the rendered HTML. No external service or GitHub Pages setup is required.

The original accepted decision and incident prose remain as historical evidence. The new
signed page explains the discrepancy with the rendered components and links a replacement
triage decision. Small shared-component changes add ticket links, keyboard focus and narrow-screen
table scrolling; classification logic and the supplied data are unchanged.

Validation and limitations: see `evidence/validation.md`. This repo covers the export snapshot;
it does not claim that either production bug has been fixed.

# prose-audit

A language audit for *Of Imagination All Compact*. Ranks pages by density of
likely writing-guide violations so a manual copy edit can start with the worst
offenders instead of page one.

## Running it

```bash
node prose-audit.js path/to/content            # full report
node prose-audit.js path/to/content --md > report.md
node prose-audit.js path/to/content --tier high    # highest-precision only
node prose-audit.js path/to/content --rule R8      # one detector
node prose-audit.js path/to/content --no-redundancy
node prose-audit.js --data src/data/hub-introductions.ts --data src/data/historical-moments.ts --md
```

No dependencies. Node 18+. Point it at the repo's content directory, not at
`/mnt/project/` — those copies drift behind the deployed site.

This directory carries its own `package.json` (`"type": "commonjs"`) because
the repo root sets `"type": "module"` — without the override, every
`require()`/`module.exports` in these files silently resolves to an empty
object instead of erroring, which is much harder to notice.

## Auditing .ts data files

`.mdx` domain pages aren't the only site prose. Hub-page epigraph
introductions (`src/data/hub-introductions.ts`) and the Historical Moment
essays (`src/data/historical-moments.ts`) are plain TypeScript data files,
so `collect()`'s `.md`/`.mdx` filter never sees them. `--data <path>` routes
a file through `data-extractor.js` instead, which pulls out only the
site-authored prose fields — `kicker`/`intro` for hub introductions,
`paragraphs[]` for Historical Moment essays — evaluates each as a real JS
string literal (so `\uXXXX` escapes decode correctly), and hands the result
through the same Layer A/B/C detectors as everything else. Epigraph quotes,
attributions, glosses, and figure/diagram captions are deliberately excluded:
they're either direct historical quotations or a different register of text
entirely, not this project's expository prose.

Adding another data file means registering an extractor for it in
`data-extractor.js` and a matching case in `main()`'s `--data` dispatch —
there's no generic fallback, by design, so a new file's fields get chosen
deliberately rather than swept in wholesale.

## What it checks

**Layer A** — LLM-cliché patterns vendored from Simon Willison's
[llm-cliche-highlighter](https://github.com/simonw/tools/blob/main/llm-cliche-highlighter.html)
(Apache-2.0), several adapted from Wikipedia's *Signs of AI writing*. Tuned per
pattern in `CLICHE_TUNING`. `colon-triple` is disabled: it fires on Rule 9
(colons over em-dashes) and Rule 12 (specific triadic detail) doing exactly what
the guide asks for.

**Layer B** — detectors keyed to Writing and Editing Guide rule numbers: hedging
(R2), second person outside instructional contexts (R8/R31), summarizing openers
(R3/R28/R30), throat-clearing (R1/R6/R19), weak paragraph endings (R18), passive
voice (R17). Em-dashes (R9) are reported as a per-page count, not a finding.

**Layer C** — 8-word shingle overlap between pages (R14/R15). Phrases appearing
in three or more files are treated as structural boilerplate and excluded;
only pairwise echoes are reported.

## What it does not check

Roughly two-thirds of the guide needs a reader. Rules 10, 13, 20, 21, 23, 24,
25, 27, 29, 32, 33, 36, 37, 39 all turn on whether a specific sentence earns its
place, which no regex can decide. **This tool triages; it does not edit.**

There are no word-count checks. Caps were retired in August 2026.

## Exclusions

Two regions are blanked before any detector runs:

- **Protected sections** — `What to Notice` / `What to Listen For` headings and
  `**Prompt:**` lines, where second person is correct.
- **Quotations over three words** — a quotation from Pico or *Hamlet* is not this
  project's prose. Without this, one Pico quotation produced six false Rule 8 hits.

## Tuning

Move a pattern between `high` / `medium` / `off` in `CLICHE_TUNING`, or edit the
`HEDGES`, `WEAK_ENDINGS`, `SUMMARY_OPENERS`, and `THROAT_CLEARING` lists at the
top of `prose-audit.js`. Do not hand-edit `cliche-patterns.js` — it is extracted
verbatim and should be re-extracted if the upstream tool updates.

## Instructional zones

Rule 8 (second person) is the only zone-scoped detector. It skips:

- `What to Notice` / `What to Listen For` sections
- `**Prompt:**` lines
- `### Gallery — …` and `### Hero — …` entry bodies, which surface on the site
  behind the "Read the analysis" disclosure and address a reader looking at the
  work

Every other detector still runs inside those zones — an instructional passage can
still hedge or reach for "seamless". Edit `INSTRUCTIONAL_HEADINGS` to adjust.

## Calibration check

Every run opens with a calibration line reporting how many instructional zones,
`**Prompt:**` lines, and quotations the suppressions actually matched.

Both suppressions fail silently. If this repo writes entry headings differently
from the corpus the tool was tuned against, `INSTRUCTIONAL_HEADINGS` matches
nothing, the run still succeeds, and Rule 8 findings from inside Gallery bodies
look exactly like real ones. The check catches that three ways:

- **Near misses** — a heading matching the loose `ENTRY_HEADING_SHAPE` but not the
  strict pattern is reported with an example, since that means the convention
  differs. This is the loudest warning and the one most likely to fire.
- **Zero zones** across all files when headings exist at all.
- **Zero quotations** blanked, which means quoted primary sources are being
  audited as house prose.

**Read the calibration line before reading the findings.** If it warns, fix the
pattern and re-run rather than working through the report.

## Review interface

`node prose-audit.js <dir> --json` emits findings with full paragraph context and
span offsets. Paste that into `prose-audit-review.html` ("Load a fresh run") to
walk the findings one at a time and mark each **Revise** / **Keep as written** /
**Decide later**, then export a decision list as markdown.

#!/usr/bin/env node
/**
 * prose-audit.js — language audit for "Of Imagination All Compact"
 *
 * Three layers:
 *   A. Curated LLM-cliché patterns (vendored from Simon Willison's tool)
 *   B. Detectors keyed to Writing and Editing Guide v3 rule numbers
 *   C. Cross-document redundancy (Rules 14/15)
 *
 * Usage:
 *   node prose-audit.js <dir-or-file> [...]      full report to stdout
 *   node prose-audit.js <dir> --tier high        high-confidence findings only
 *   node prose-audit.js <dir> --md > report.md   markdown report
 *   node prose-audit.js <dir> --rule R8          one detector only
 *
 * No word-count checks. Word caps were retired as a consideration
 * (Aug 2026) after the structural changes to the period pages.
 */

const fs = require('fs');
const path = require('path');
const { patterns: clichePatterns } = require('./cliche-patterns.js');

/* ------------------------------------------------------------------ *
 * LAYER A — curated cliché patterns
 *
 * tier: high   = near-certain violation in this corpus, read every hit
 *       medium = real signal, expect some false positives
 *       off    = fires constantly on correct house style; disabled
 * ------------------------------------------------------------------ */
const CLICHE_TUNING = {
  'not-just':            { tier: 'high',   rule: 'R7/R26' },
  'note-that':           { tier: 'high',   rule: 'R2' },
  'testament':           { tier: 'high',   rule: 'R10' },
  'crucial-role':        { tier: 'high',   rule: 'R10' },
  'participle-tail':     { tier: 'high',   rule: 'R3/R28' },
  'ai-vocab':            { tier: 'high',   rule: 'R34' },
  'ai-leftovers':        { tier: 'high',   rule: '—' },
  'vague-experts':       { tier: 'high',   rule: 'R12' },
  'landscape':           { tier: 'high',   rule: 'R34' },
  'despite-challenges':  { tier: 'high',   rule: 'R34' },

  'no-chain':            { tier: 'medium', rule: 'R1/R26' },
  'did-not-chain':       { tier: 'medium', rule: 'R1/R26' },
  'echo-triad':          { tier: 'medium', rule: 'R20' },
  'sentence-anaphora':   { tier: 'medium', rule: 'R20' },
  'stacked-questions':   { tier: 'medium', rule: 'R35' },
  'stranded-auxiliary':  { tier: 'medium', rule: 'R18' },
  'promo':               { tier: 'medium', rule: 'R34' },

  // Fires on Rule 9 (colons over em-dashes) and Rule 12 (specific triadic
  // detail) doing exactly what the guide asks for. 36 hits, ~all false.
  'colon-triple':        { tier: 'off',    rule: '—' },
};
const DEFAULT_CLICHE_TIER = 'medium';

/* ------------------------------------------------------------------ *
 * LAYER B — guide-derived detectors (v3 numbering)
 * ------------------------------------------------------------------ */

const HEDGES = [
  'if you look carefully', 'if we look carefully', 'strictly speaking',
  'in many ways', 'in some ways', 'in a sense', 'to some extent',
  'arguably', 'it could be argued', 'one might say', 'perhaps most',
  'something of a', 'a kind of', 'somewhat', 'rather more', 'quite possibly',
  'more or less', 'in a way', 'almost as if', 'it is worth noting',
  'it is tempting to',
];

// Rule 18: paragraph endings that fizzle.
const WEAK_ENDINGS = [
  'as well', 'too', 'also', 'in this way', 'as a result', 'in the process',
  'at the same time', 'reality', 'meaning', 'significance', 'existence',
  'experience', 'understanding', 'importance', 'complexity', 'tension',
  'as well.', 'itself',
];

// Rules 3/28/30: sentences that open by announcing a summary.
const SUMMARY_OPENERS = /^(together|taken together|in this way|in short|ultimately|what emerges|the result is|both of these|both works|in the end|put another way|the point is|this is why|what all of this|seen this way|in each case)\b/i;

// Rules 1/6/19: openings that announce rather than argue.
const THROAT_CLEARING = /^(to understand|before (we|turning)|this section|what follows|it is (helpful|useful|important) to|the (key|central|crucial) (point|question|issue) (here )?is|at its (core|heart)|first,? it is worth|one way to (think|understand))\b/i;

const GUIDE_DETECTORS = [
  {
    id: 'R2-hedging', rule: 'R2', tier: 'high',
    name: 'Hedging qualification',
    find: (t) => matchAny(t, HEDGES),
  },
  {
    id: 'R8-second-person', rule: 'R8/R31', tier: 'high',
    name: 'Second person outside instructional context',
    zone: 'analytical',   // skips instructional zones; see stripInstructional
    find: (t) => reAll(t, /\b(you|your|yours|yourself|you're|you've|you'll)\b/gi),
  },
  {
    id: 'R3-summary-opener', rule: 'R3/R28/R30', tier: 'high',
    name: 'Summarizing sentence opener',
    find: (t) => sentenceStarts(t, SUMMARY_OPENERS),
  },
  {
    id: 'R1-throat-clearing', rule: 'R1/R6/R19', tier: 'high',
    name: 'Throat-clearing opener',
    find: (t) => sentenceStarts(t, THROAT_CLEARING),
  },
  {
    id: 'R18-weak-ending', rule: 'R18', tier: 'medium',
    name: 'Paragraph ends on a weak word',
    find: (t) => paragraphEndings(t, WEAK_ENDINGS),
  },
  {
    id: 'R17-passive', rule: 'R17', tier: 'medium',
    name: 'Passive construction',
    find: (t) => reAll(t,
      /\b(is|are|was|were|been|being|be)\s+(\w+ly\s+)?(shown|depicted|rendered|portrayed|presented|seen|understood|regarded|considered|viewed|treated|placed|arranged|composed|constructed|designed|marked|characterized|defined|described|given|made|used|held|framed)\b/gi),
  },
  {
    id: 'R22-flat-interpretive', rule: 'R22', tier: 'low',
    name: 'Interpretive claim stated as fact',
    find: (t) => reAll(t,
      /\b(the (?:novel|poem|play|painting|sculpture|work|text)|[A-Z][a-z]+'s (?:novel|poem|play|painting|sculpture))\s+is\s+(?:a|an|the)\s+\w+/g),
  },
  {
    id: 'R9-emdash', rule: 'R9', tier: 'stat',
    name: 'Em-dash',
    find: (t) => reAll(t, /\u2014/g),
  },
];

/* ------------------------------------------------------------------ *
 * Detector helpers
 * ------------------------------------------------------------------ */

function reAll(text, re) {
  const out = [];
  for (const m of text.matchAll(re)) out.push({ start: m.index, end: m.index + m[0].length });
  return out;
}

function matchAny(text, phrases) {
  const re = new RegExp('\\b(' + phrases.map(esc).join('|') + ')\\b', 'gi');
  return reAll(text, re);
}

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function sentenceStarts(text, re) {
  const out = [];
  for (const m of text.matchAll(/(?:^|[.!?]\s+|\n\n)\s*([A-Z][^.!?\n]{0,120}[.!?])/g)) {
    const sent = m[1];
    if (re.test(sent)) {
      const start = m.index + m[0].indexOf(sent);
      out.push({ start, end: start + Math.min(sent.length, 90) });
    }
  }
  return out;
}

function paragraphEndings(text, weak) {
  const out = [];
  for (const para of text.split(/\n{2,}/)) {
    const idx = text.indexOf(para);
    const trimmed = para.trim().replace(/[*_"'\u201d\u2019)\]]+$/, '');
    const m = trimmed.match(/([\w' -]+)[.!?]?$/);
    if (!m) continue;
    const tail = m[1].trim().toLowerCase();
    if (weak.some(w => tail === w || tail.endsWith(' ' + w))) {
      const s = idx + para.lastIndexOf(m[1]);
      out.push({ start: s, end: s + m[1].length });
    }
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Section awareness
 * ------------------------------------------------------------------ */

/**
 * Instructional zones — where direct address to the reader is correct, so
 * Rule 8 does not apply. Scoped to the R8 detector rather than blanked
 * globally: hedging, AI vocabulary and weak endings still apply inside them.
 *
 *   - "What to Notice" / "What to Listen For" sections
 *   - "**Prompt:**" lines beneath Gallery and Hero entries
 *   - Gallery and Hero entry bodies, which surface on the site behind the
 *     "Read the analysis" disclosure and address a reader looking at the
 *     work: "pulling your eye into a deep, rationally organized space."
 */
const INSTRUCTIONAL_HEADINGS = /^#{1,4}\s*(what to (listen for|notice)|listening guide|viewing guide|gallery\s*[\u2014\u2013-]|hero\s*[\u2014\u2013-])/i;
const INSTRUCTIONAL_LINE = /^\s*\*\*(prompt|what to notice|what to listen for)\s*:?\*\*/i;

// Deliberately looser than INSTRUCTIONAL_HEADINGS: no separator required. A
// heading that matches this but not the strict pattern is a near miss, which
// means the repo writes entry headings in a form the exemption doesn't know
// about. That is the silent failure worth shouting about.
const ENTRY_HEADING_SHAPE = /^#{1,4}\s*(gallery|hero|plate|what to (notice|listen)|listening guide|viewing guide)\b/i;

/**
 * Blank out quoted primary-source material. A quotation from Pico or
 * Hamlet is not this project's prose and must not be audited against
 * house style — without this, one Pico quotation produces six Rule 8
 * "second person" hits. Short quoted terms (<= 3 words) are kept, since
 * those are scare-quoted vocabulary, not quotation.
 */
function stripQuotes(text) {
  let count = 0;
  const out = text.replace(/["\u201c]([^"\u201c\u201d\n]{1,600})["\u201d]/g, (m, inner) => {
    const words = (inner.match(/\S+/g) || []).length;
    if (words > 3) { count++; return ' '.repeat(m.length); }
    return m;
  });
  return { text: out, count };
}

/**
 * Blank the instructional zones, preserving offsets so findings still map
 * to the right line and section.
 */
function stripInstructional(text) {
  const lines = text.split('\n');
  let inZone = false, zones = 0, promptLines = 0, headings = 0;
  let nearMisses = 0, nearMissExample = '';
  const out = lines.map((line) => {
    if (/^#{1,4}\s/.test(line)) {
      headings++;
      inZone = INSTRUCTIONAL_HEADINGS.test(line);
      if (inZone) zones++;
      else if (ENTRY_HEADING_SHAPE.test(line)) {
        nearMisses++;
        if (!nearMissExample) nearMissExample = line.trim().slice(0, 70);
      }
    }
    const isPrompt = INSTRUCTIONAL_LINE.test(line);
    if (isPrompt) promptLines++;
    return (inZone || isPrompt) ? ' '.repeat(line.length) : line;
  }).join('\n');
  return { text: out, zones, promptLines, headings, nearMisses, nearMissExample };
}

function stripFrontmatter(text) {
  const m = text.match(/^---\n[\s\S]*?\n---\n/);
  if (!m) return { body: text, offset: 0 };
  return { body: ' '.repeat(m[0].length) + text.slice(m[0].length), offset: 0 };
}

function lineOf(text, pos) { return text.slice(0, pos).split('\n').length; }

function sectionOf(text, pos) {
  const before = text.slice(0, pos).split('\n');
  for (let i = before.length - 1; i >= 0; i--) {
    if (/^#{1,4}\s/.test(before[i])) return before[i].replace(/^#+\s*/, '').slice(0, 48);
  }
  return '(top)';
}

/**
 * The whole paragraph a finding sits in, with the flagged span's offsets
 * rebased to the paragraph. The review tool needs real context, not a
 * 40-character window.
 */
function paragraphAt(text, pos) {
  let start = text.lastIndexOf('\n\n', pos);
  start = start === -1 ? 0 : start + 2;
  let end = text.indexOf('\n\n', pos);
  if (end === -1) end = text.length;
  return { text: text.slice(start, end).trim(), offset: start };
}

function snippet(text, h, pad = 40) {
  const s = Math.max(0, h.start - pad), e = Math.min(text.length, h.end + pad);
  return (s > 0 ? '…' : '') + text.slice(s, e).replace(/\s+/g, ' ').trim() + (e < text.length ? '…' : '');
}


/* ------------------------------------------------------------------ *
 * Calibration check
 *
 * Both suppressions are silent when they fail. If the repo marks Gallery
 * entries differently from the corpus this was tuned against, or uses a
 * different quotation convention, the exemptions match nothing, the run
 * still succeeds, and the extra findings look like real ones. This makes
 * that failure visible instead.
 * ------------------------------------------------------------------ */
function calibrationReport(docs) {
  const t = docs.reduce((a, d) => ({
    zones: a.zones + d.calibration.zones,
    promptLines: a.promptLines + d.calibration.promptLines,
    quotations: a.quotations + d.calibration.quotations,
    headings: a.headings + d.calibration.headings,
    nearMisses: a.nearMisses + d.calibration.nearMisses,
  }), { zones: 0, promptLines: 0, quotations: 0, headings: 0, nearMisses: 0 });

  const example = (docs.find(d => d.calibration.nearMissExample) || { calibration: {} })
    .calibration.nearMissExample;

  const warnings = [];
  if (t.nearMisses > 0) warnings.push(
    t.nearMisses + ' heading(s) look like Gallery, Hero, or What to Notice entries but did not '
    + 'match INSTRUCTIONAL_HEADINGS, e.g. "' + example + '". Rule 8 is being applied inside those '
    + 'sections, so second-person findings there are false. Update INSTRUCTIONAL_HEADINGS to this '
    + 'repo\'s heading convention and re-run.');
  if (t.headings > 0 && t.zones === 0) warnings.push(
    'No instructional zones matched in any file, but ' + t.headings + ' headings were found. '
    + 'INSTRUCTIONAL_HEADINGS is almost certainly not matching this repo\'s markup, which means '
    + 'Rule 8 is being applied inside Gallery and Hero entries. Check how entry headings are '
    + 'written and update the pattern before trusting any second-person finding.');
  if (t.quotations === 0) warnings.push(
    'No quotations were blanked anywhere. If this content quotes primary sources, the quotation '
    + 'pattern is not matching, and quoted text is being audited as house prose.');
  if (t.promptLines === 0 && t.zones > 0) warnings.push(
    'No "**Prompt:**" lines matched. Harmless if this content has none; otherwise check '
    + 'INSTRUCTIONAL_LINE.');

  const perFile = docs
    .filter(d => d.calibration.headings > 0 && d.calibration.zones === 0)
    .map(d => d.file);

  return { totals: t, warnings, perFile };
}

/* ------------------------------------------------------------------ *
 * LAYER C — cross-document redundancy (Rules 14/15)
 * ------------------------------------------------------------------ */

function shingles(text, n = 8) {
  const w = text.toLowerCase().match(/[a-z0-9'\u2019-]+/g) || [];
  const map = new Map();
  for (let i = 0; i + n <= w.length; i++) {
    const g = w.slice(i, i + n).join(' ');
    if (!map.has(g)) map.set(g, i);
  }
  return map;
}

function findRedundancy(docs, n = 8) {
  const grams = docs.map(d => ({ file: d.file, map: shingles(d.clean, n) }));

  // Thread headings and their standing definitions repeat across every page
  // in a domain by design. A phrase appearing in three or more files is
  // structural boilerplate, not redundancy — only pairwise echoes are real.
  const df = new Map();
  for (const g of grams) for (const k of g.map.keys()) df.set(k, (df.get(k) || 0) + 1);

  const out = [];
  for (let i = 0; i < grams.length; i++) {
    for (let j = i + 1; j < grams.length; j++) {
      const shared = [];
      for (const g of grams[i].map.keys()) {
        if (grams[j].map.has(g) && df.get(g) === 2) shared.push(g);
      }
      if (shared.length) {
        // collapse overlapping shingles into longest representatives
        shared.sort((a, b) => b.length - a.length);
        const reps = [];
        for (const s of shared) if (!reps.some(r => r.includes(s))) reps.push(s);
        out.push({ a: grams[i].file, b: grams[j].file, phrases: reps.slice(0, 5), count: reps.length });
      }
    }
  }
  return out.sort((x, y) => y.count - x.count);
}

/* ------------------------------------------------------------------ *
 * Runner
 * ------------------------------------------------------------------ */

function collect(targets) {
  const files = [];
  for (const t of targets) {
    const st = fs.statSync(t);
    if (st.isDirectory()) {
      for (const f of fs.readdirSync(t)) {
        if (/\.(md|mdx)$/.test(f)) files.push(path.join(t, f));
      }
    } else files.push(t);
  }
  return files.sort();
}

/**
 * Runs Layer A (cliché patterns) and Layer B (guide detectors) over a
 * cleaned text and returns findings. `analytical` is the same text with
 * instructional zones blanked — pass it equal to `clean` for sources (like
 * the .ts data files) that have no such zones.
 */
function runDetectors(clean, analytical) {
  const findings = [];

  for (const p of clichePatterns) {
    const tune = CLICHE_TUNING[p.id] || { tier: DEFAULT_CLICHE_TIER, rule: '—' };
    if (tune.tier === 'off') continue;
    let hits = [];
    try { hits = p.find(clean); } catch (e) { /* pattern needs DOM; skip */ }
    for (const h of hits) {
      findings.push({
        layer: 'A', id: p.id, name: p.name, rule: tune.rule, tier: tune.tier,
        line: lineOf(clean, h.start), section: sectionOf(clean, h.start),
        text: snippet(clean, h),
        context: paragraphAt(clean, h.start),
        span: [h.start, h.end],
        flagged: clean.slice(h.start, h.end),
      });
    }
  }

  for (const d of GUIDE_DETECTORS) {
    const target = d.zone === 'analytical' ? analytical : clean;
    for (const h of d.find(target)) {
      findings.push({
        layer: 'B', id: d.id, name: d.name, rule: d.rule, tier: d.tier,
        line: lineOf(clean, h.start), section: sectionOf(clean, h.start),
        text: snippet(clean, h),
        context: paragraphAt(clean, h.start),
        span: [h.start, h.end],
        flagged: clean.slice(h.start, h.end),
      });
    }
  }

  return findings;
}

function auditFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const { body } = stripFrontmatter(raw);
  const q = stripQuotes(body);
  const clean = q.text;                                  // all detectors
  const zi = stripInstructional(clean);
  const analytical = zi.text;                            // Rule 8 only
  const calibration = {
    quotations: q.count,
    zones: zi.zones,
    promptLines: zi.promptLines,
    headings: zi.headings,
    nearMisses: zi.nearMisses,
    nearMissExample: zi.nearMissExample,
  };
  const words = (clean.match(/\S+/g) || []).length;
  const findings = runDetectors(clean, analytical);
  return { file: path.basename(file), words, findings, clean, calibration };
}

/**
 * Audits a synthetic document built by data-extractor.js from a .ts data
 * file — one field per line, joined with blank lines, with lineMap/fieldMap
 * recording each field's real source line and label. There are no
 * instructional zones or frontmatter in these sources, so `clean` doubles
 * as `analytical`. Findings' local line numbers get translated back to the
 * real file line and field name before anything is reported.
 */
function auditDataDoc(doc) {
  const q = stripQuotes(doc.clean);
  const clean = q.text;
  const findings = runDetectors(clean, clean);
  for (const f of findings) {
    const fieldIndex = Math.floor((f.line - 1) / 2);
    f.line = doc.lineMap[fieldIndex] ?? f.line;
    f.section = doc.fieldMap[fieldIndex] ?? f.section;
  }
  const words = (clean.match(/\S+/g) || []).length;
  return { file: doc.file, words, findings, clean, calibration: { ...doc.calibration, quotations: q.count } };
}

function main() {
  const args = process.argv.slice(2);
  const flags = { dataTargets: [] };
  const targets = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--tier') flags.tier = args[++i];
    else if (args[i] === '--rule') flags.rule = args[++i];
    else if (args[i] === '--md') flags.md = true;
    else if (args[i] === '--json') flags.json = true;
    else if (args[i] === '--no-redundancy') flags.noRed = true;
    else if (args[i] === '--data') flags.dataTargets.push(args[++i]);
    else targets.push(args[i]);
  }
  if (!targets.length && !flags.dataTargets.length) {
    console.error('usage: node prose-audit.js <dir-or-file> [--data path/to/file.ts] [--tier high] [--rule R8] [--md]');
    process.exit(2);
  }

  const dataDocs = flags.dataTargets.flatMap((dt) => {
    const base = path.basename(dt);
    const extractor = require('./data-extractor.js');
    if (base === 'hub-introductions.ts') return extractor.extractHubIntroductions(dt).map(auditDataDoc);
    if (base === 'historical-moments.ts') return extractor.extractHistoricalMoments(dt).map(auditDataDoc);
    throw new Error(`No data extractor registered for "${base}". Add one to data-extractor.js.`);
  });

  const docs = collect(targets).map(auditFile).concat(dataDocs);
  const keep = f =>
    (!flags.tier || f.tier === flags.tier) &&
    (!flags.rule || f.rule.includes(flags.rule) || f.id.includes(flags.rule));

  if (flags.json) {
    const payload = docs.map(d => ({
      file: d.file,
      words: d.words,
      findings: d.findings.filter(keep).filter(f => f.tier !== 'stat').map((f, i) => {
        // Trim blanked regions (quotes, instructional zones) off the span
        // ends so the review tool never marks a run of spaces.
        let [s0, s1] = f.span;
        while (s0 < s1 && /\s/.test(d.clean[s0])) s0++;
        while (s1 > s0 && /\s/.test(d.clean[s1 - 1])) s1--;
        return {
        id: `${d.file}:${f.line}:${f.id}:${i}`,
        rule: f.rule, name: f.name, tier: f.tier, layer: f.layer,
        section: f.section, line: f.line,
        flagged: d.clean.slice(s0, s1),
        context: f.context.text,
        spanInContext: [s0 - f.context.offset, s1 - f.context.offset],
      };}),
    })).filter(d => d.findings.length);
    console.log(JSON.stringify({ generated: new Date().toISOString(),
      calibration: calibrationReport(docs), docs: payload }, null, 2));
    return;
  }

  const TIERS = ['high', 'medium', 'low', 'stat'];
  const out = [];
  const P = s => out.push(s);

  P('# Prose audit — Of Imagination All Compact');
  P('');
  P(`Run ${new Date().toISOString().slice(0, 10)} over ${docs.length} files. `
    + 'Rule numbers refer to Writing and Editing Guide v3. No word-count checks.');
  P('');

  // Ranking table
  const cal = calibrationReport(docs);
  P('## Calibration check');
  P('');
  P(`Instructional zones matched: **${cal.totals.zones}** · `
    + `\`**Prompt:**\` lines: **${cal.totals.promptLines}** · `
    + `quotations blanked: **${cal.totals.quotations}** · `
    + `headings seen: ${cal.totals.headings}`);
  P('');
  if (cal.warnings.length) {
    for (const w of cal.warnings) P(`> **Check this before reading the findings.** ${w}`);
    P('');
  } else {
    P('Both suppressions matched. Findings below can be read at face value.');
    P('');
  }
  if (cal.perFile.length) {
    P(`Files with headings but no instructional zone: ${cal.perFile.join(', ')}. `
      + (cal.totals.nearMisses ? 'Given the near misses above, check these first.'
                               : 'Expected for pages with no Gallery, Hero, or What to Notice section.'));
    P('');
  }

  P('## Pages ranked by high-confidence findings');
  P('');
  P('| File | Words | High | Medium | Em-dashes |');
  P('|---|---:|---:|---:|---:|');
  const ranked = docs.map(d => ({
    d,
    high: d.findings.filter(f => f.tier === 'high').length,
    med: d.findings.filter(f => f.tier === 'medium').length,
    em: d.findings.filter(f => f.tier === 'stat').length,
  })).sort((a, b) => (b.high / b.d.words) - (a.high / a.d.words));
  for (const r of ranked) {
    P(`| ${r.d.file} | ${r.d.words} | ${r.high} | ${r.med} | ${r.em} |`);
  }
  P('');

  // Findings by file
  for (const r of ranked) {
    const fs_ = r.d.findings.filter(keep).filter(f => f.tier !== 'stat');
    if (!fs_.length) continue;
    P(`## ${r.d.file}`);
    P('');
    for (const tier of TIERS) {
      const group = fs_.filter(f => f.tier === tier);
      if (!group.length) continue;
      P(`### ${tier}`);
      P('');
      for (const f of group) {
        P(`- **${f.rule}** ${f.name} — *${f.section}* (line ${f.line})`);
        P(`  > ${f.text}`);
      }
      P('');
    }
  }

  if (!flags.noRed) {
    const red = findRedundancy(docs);
    if (red.length) {
      P('## Layer C — repeated phrasing across pages (Rules 14/15)');
      P('');
      for (const r of red.slice(0, 20)) {
        P(`- **${r.a}** ↔ **${r.b}** — ${r.count} shared 8-word runs`);
        for (const p of r.phrases) P(`  > …${p}…`);
      }
      P('');
    }
  }

  console.log(out.join('\n'));
}

main();

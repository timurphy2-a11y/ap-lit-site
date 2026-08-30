// data-extractor.js
// Extracts specific prose fields from known .ts data files (hub-introductions.ts,
// historical-moments.ts) so prose-audit.js can run its normal detectors over
// them. Fields containing direct quotations from historical sources
// (epigraphs, figure captions, diagram labels) are deliberately excluded —
// only site-authored expository prose is audited, matching the markdown
// auditor's own exclusion of quoted primary-source text.
//
// Each source line must hold exactly one complete string literal (no
// multi-line template strings) — the extraction relies on this to map
// findings back to real file lines. If a data file's format changes, update
// the regexes here rather than the line-index math in prose-audit.js.

const fs = require('fs');

// Evaluate a single JS string literal (already isolated by a regex) to get
// its real decoded value — handles \uXXXX escapes and both quote styles.
// Safe: the input is always a literal string slice from our own repo file,
// never user input or a full expression.
function decodeLiteral(literal) {
  return Function('"use strict"; return (' + literal + ');')();
}

const UNIT_RE = /^\s*'([\w-]+)':\s*\{/;
const STRING_LITERAL = `'(?:\\\\.|[^'\\\\])*'|"(?:\\\\.|[^"\\\\])*"`;

function extractFieldLines(filePath, fieldNames) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');
  const fieldRe = new RegExp(
    '^\\s*(' + fieldNames.join('|') + '):\\s*(' + STRING_LITERAL + ')\\s*,?\\s*$'
  );
  let currentUnit = null;
  const out = [];
  lines.forEach((line, i) => {
    const um = UNIT_RE.exec(line);
    if (um) { currentUnit = um[1]; return; }
    const fm = fieldRe.exec(line);
    if (fm && currentUnit) {
      const text = decodeLiteral(fm[2]).replace(/\n/g, ' ');
      out.push({ unit: currentUnit, field: fm[1], sourceLine: i + 1, text });
    }
  });
  return out;
}

function extractParagraphArray(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');
  const arrayStartRe = /^\s*paragraphs:\s*\[\s*$/;
  const stringLineRe = new RegExp('^\\s*(' + STRING_LITERAL + ')\\s*,?\\s*$');
  let currentUnit = null, inArray = false, paraIndex = 0;
  const out = [];
  lines.forEach((line, i) => {
    const um = UNIT_RE.exec(line);
    if (um) { currentUnit = um[1]; inArray = false; paraIndex = 0; return; }
    if (arrayStartRe.test(line)) { inArray = true; paraIndex = 0; return; }
    if (inArray) {
      if (/^\s*\]\s*,?\s*$/.test(line)) { inArray = false; return; }
      const sm = stringLineRe.exec(line);
      if (sm && currentUnit) {
        const text = decodeLiteral(sm[1]).replace(/\n/g, ' ');
        out.push({ unit: currentUnit, field: `paragraph ${paraIndex + 1}`, sourceLine: i + 1, text });
        paraIndex++;
      }
    }
  });
  return out;
}

// Groups extracted fields into one synthetic document per unit, each field
// joined as its own paragraph. This "one field = one line in the joined
// text" invariant is what lets prose-audit.js translate a finding's local
// line number back to (real source line, field name) via lineMap/fieldMap.
function groupByUnit(entries, fileLabel) {
  const byUnit = new Map();
  for (const e of entries) {
    if (!byUnit.has(e.unit)) byUnit.set(e.unit, []);
    byUnit.get(e.unit).push(e);
  }
  const docs = [];
  for (const [unit, fields] of byUnit) {
    docs.push({
      file: `${fileLabel}::${unit}`,
      clean: fields.map(f => f.text).join('\n\n'),
      lineMap: fields.map(f => f.sourceLine),
      fieldMap: fields.map(f => f.field),
      calibration: { quotations: 0, zones: 0, promptLines: 0, headings: 0, nearMisses: 0 },
    });
  }
  return docs;
}

function extractHubIntroductions(filePath) {
  // kicker + intro only — epigraphs[].quote is a direct historical
  // quotation, attribution is a citation, gloss is a translation of the
  // quote. None of that is this project's own prose.
  return groupByUnit(extractFieldLines(filePath, ['kicker', 'intro']), 'hub-introductions.ts');
}

function extractHistoricalMoments(filePath) {
  // paragraphs[] only — subtitle is a date-range label, figure/sysmap
  // fields are captions and diagram labels, a different register entirely.
  return groupByUnit(extractParagraphArray(filePath), 'historical-moments.ts');
}

module.exports = { extractHubIntroductions, extractHistoricalMoments };

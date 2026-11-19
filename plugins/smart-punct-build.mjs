// Astro integration: after the static build, apply smart punctuation to the visible
// text of every AP-site page. Catch-all for text that comes from .astro templates and
// TS data files, which skip the MDX/frontmatter paths. Only text nodes are touched:
// attributes, <head>, <script>, <style>, <pre> and <code> and the separate
// summer-reading section are left alone.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { smartText } from '../src/lib/smart-punct.mjs';

const TAG = /(<!--[\s\S]*?-->|<\/?[a-zA-Z][^\s>\/]*(?:"[^"]*"|'[^']*'|[^>"'])*>)/;
const RAW = new Set(['script', 'style', 'pre', 'code', 'textarea', 'head', 'kbd', 'samp']);
const BLOCK = new Set(['p', 'div', 'li', 'ul', 'ol', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figure', 'figcaption', 'section', 'article', 'td', 'th', 'tr', 'table', 'br', 'hr', 'details', 'summary', 'dd', 'dt', 'button', 'nav', 'header', 'footer', 'main', 'aside', 'body', 'a']);

const RAWBLOCK = /(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<head\b[\s\S]*?<\/head>|<pre\b[\s\S]*?<\/pre>|<textarea\b[\s\S]*?<\/textarea>)/i;

// Script/style/head/pre blocks are carved out first: JS like `a<b` would otherwise
// look like a tag and swallow the closing </script>.
export function smartHtml(html) {
  return html.split(RAWBLOCK).map((seg, i) => (i % 2 === 1 ? seg : smartHtmlFragment(seg))).join('');
}

function smartHtmlFragment(html) {
  let depth = 0; // inside a RAW element
  const rawStack = [];
  let prev = '';
  return html
    .split(TAG)
    .map((seg, i) => {
      if (i % 2 === 1) {
        const m = /^<(\/?)([a-zA-Z][^\s>\/]*)/.exec(seg);
        if (m) {
          const name = m[2].toLowerCase();
          const closing = m[1] === '/';
          const selfClosing = /\/>$/.test(seg);
          if (RAW.has(name)) {
            if (closing) { const k = rawStack.lastIndexOf(name); if (k >= 0) rawStack.length = k; }
            else if (!selfClosing) rawStack.push(name);
          }
          if (BLOCK.has(name) && name !== 'a') prev = '';
        }
        return seg;
      }
      if (rawStack.length || !seg) return seg;
      const text = seg.replace(/&#(?:39|x27);/gi, "'").replace(/&quot;|&#34;|&#x22;/gi, '"');
      const out = smartText(text, prev);
      if (out) prev = out[out.length - 1];
      return out;
    })
    .join('');
}

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name === 'summer-reading' || e.name === '_astro') continue; yield* walk(p); }
    else if (e.name.endsWith('.html')) yield p;
  }
}

export default function smartPunctBuild() {
  return {
    name: 'smart-punct-build',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        let n = 0;
        for (const f of walk(root)) {
          const src = fs.readFileSync(f, 'utf8');
          const out = smartHtml(src);
          if (out !== src) { fs.writeFileSync(f, out); n++; }
        }
        console.log(`[smart-punct-build] smart punctuation applied to ${n} pages`);
      },
    },
  };
}

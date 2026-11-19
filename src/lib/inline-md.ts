// Inline markdown + smart punctuation for frontmatter strings (analysis panels etc.).
// **strong** and *emphasis*, then straight quotes become typographic quotes.
// Output is HTML-escaped first, so it is safe to pass to set:html.
import { smartText } from './smart-punct.mjs';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function smart(text: string | undefined | null): string {
  return text ? smartText(text) : '';
}

export function inlineMd(text: string | undefined | null): string {
  if (!text) return '';
  const html = esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Smart punctuation on text segments only, carrying the previous character across tags.
  let prev = '';
  return html
    .split(/(<[^>]+>)/)
    .map((seg) => {
      if (seg.startsWith('<')) return seg;
      const out = smartText(seg, prev);
      if (out) prev = out[out.length - 1];
      return out;
    })
    .join('');
}

// Deep-map every string in a parsed frontmatter object through smart punctuation.
export function smartDeep<T>(v: T): T {
  if (typeof v === 'string') return smartText(v) as unknown as T;
  if (Array.isArray(v)) return v.map(smartDeep) as unknown as T;
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v as object).map(([k, x]) => [k, smartDeep(x)])) as T;
  }
  return v;
}

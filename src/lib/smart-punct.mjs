// Smart punctuation: straight ' and " -> typographic quotes/apostrophes.
// Works on a stream of text; `prev` carries the previous character across
// inline nodes (so "<em>Hamlet</em>" quotes pair correctly).
const OPENERS = /[\s(\[{—–‘“ ―]/;
// Leading-apostrophe elisions: 'tis 'twas 'em 'cause 'til '60s '99
const ELISION = /^(tis|twas|twere|twill|em|cause|til|round|n'|\d{2}s?\b)/i;

export function smartText(str, prev = '') {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    // Markdown emphasis markers are transparent: look past any run of '*' to the real neighbour.
    let j = i - 1;
    while (j >= 0 && str[j] === '*') j--;
    const before = j >= 0 ? str[j] : prev;
    const after = str[i + 1] ?? '';
    if (ch === '"') {
      let open = before === '' || OPENERS.test(before);
      // em dash before a quote that is followed by space/end: interrupted speech -> closing
      if ((before === '—' || before === '–') && (after === '' || /[\s.,;:!?)]/.test(after))) open = false;
      out += open ? '“' : '”';
    } else if (ch === "'") {
      let open = before === '' || OPENERS.test(before);
      if (open && ELISION.test(str.slice(i + 1))) open = false;
      if ((before === '—' || before === '–') && (after === '' || /[\s.,;:!?)]/.test(after))) open = false;
      out += open ? '‘' : '’';
    } else out += ch;
  }
  return out;
}

const SKIP = new Set(['code', 'pre', 'script', 'style', 'kbd', 'samp', 'svg', 'math']);
const BLOCK = new Set(['p', 'div', 'li', 'ul', 'ol', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figure', 'figcaption', 'section', 'article', 'td', 'th', 'tr', 'table', 'br', 'hr', 'details', 'summary', 'dd', 'dt']);

// rehype plugin: smart punctuation over every text node in the MDX output,
// including text inside raw-HTML/JSX elements. Attributes, code and svg are skipped.
export default function rehypeSmartPunct() {
  return (tree) => {
    let prev = '';
    (function walk(node) {
      const name = node.tagName || node.name;
      if (name && SKIP.has(name)) return;
      const isBlock = name && BLOCK.has(name);
      if (isBlock) prev = '';
      if (node.type === 'text') {
        node.value = smartText(node.value, prev);
        if (node.value.length) prev = node.value[node.value.length - 1];
        return;
      }
      (node.children || []).forEach(walk);
      if (isBlock) prev = '';
    })(tree);
  };
}

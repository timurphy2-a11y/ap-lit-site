// Gives each thread heading its frontmatter thread id (e.g. "figure-space",
// "human-position") as the one public section id, at build time, and keeps the
// heading-slug id ("figure--space", "the-human-position") as an empty alias
// anchor placed immediately before the heading so old links still resolve.
import GithubSlugger from 'github-slugger';

const text = (n) => (n.type === 'text' ? n.value : (n.children || []).map(text).join(''));

export default function rehypeThreadIds() {
  return (tree, file) => {
    const threads = file.data?.astro?.frontmatter?.threads;
    if (!Array.isArray(threads) || !threads.length) return;
    const ids = threads.map((t) => t.id);

    const h2s = [];
    (function walk(node, parent) {
      if (node.type === 'element' && node.tagName === 'h2') h2s.push({ node, parent });
      (node.children || []).forEach((c) => walk(c, node));
    })(tree, null);

    // Same slugger and order Astro uses for heading ids.
    const slugger = new GithubSlugger();
    const work = h2s.map((h) => ({ ...h, slug: slugger.slug(text(h.node)) }));

    // h2 #0 is the introduction; the next N are the thread headings.
    for (let i = work.length - 1; i >= 1; i--) {
      if (i > ids.length) continue;
      const { node, parent, slug } = work[i];
      const publicId = ids[i - 1];
      node.properties = node.properties || {};
      node.properties.id = publicId;
      if (slug !== publicId && parent) {
        const at = parent.children.indexOf(node);
        parent.children.splice(at, 0, {
          type: 'element',
          tagName: 'span',
          properties: { id: slug, ariaHidden: 'true' },
          children: [],
        });
      }
    }
  };
}

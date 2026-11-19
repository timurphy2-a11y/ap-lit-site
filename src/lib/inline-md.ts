// Inline markdown for frontmatter strings (analysis panels etc.): **strong** and *emphasis*.
// Output is HTML-escaped first, so it is safe to pass to set:html.
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function inlineMd(text: string | undefined | null): string {
  if (!text) return '';
  return esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

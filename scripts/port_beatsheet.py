#!/usr/bin/env python3
"""
Port beat sheet files to Astro MDX content files.
Reads beat sheets from stage2_package and writes MDX to the content collection.

Usage:
  python3 scripts/port_beatsheet.py <section> <spoke>
  python3 scripts/port_beatsheet.py tfa novel
  python3 scripts/port_beatsheet.py tfa world
"""

import sys
import re
from pathlib import Path

WORKTREE = Path(__file__).resolve().parent.parent
BEATSHEETS_DIR = Path.home() / "Desktop/Summer Reading Site Materials"

SPOKE_NUM = {
    "world": "spoke1", "culture": "spoke2", "history": "spoke3",
    "figures": "spoke4", "novel": "spoke5",
}

# Map beat-sheet filenames → deployed public/ filenames
TFA_IMAGE_MAP = {
    'Map of Igboland.jpg':                                't1-igboland-map.jpg',
    'Bonny Chiefs with Naval Commandant of the Coast Biafra and Bight of Benin 1896.jpg':
                                                          't1-bonny-chiefs.jpg',
    'Stocker_yam_barn_1880-1939.jpg':                    't1-yam-barn.jpg',
    'Die_Gartenlaube_1884_b_805.jpg':                    't3-berlin-conference.jpg',
    'Scramble_for_Africa_1914.png':                      't3-scramble-africa.svg',
    'The_sultan_of_Sokoto_and_the_emirs_of_Gwandu_and_Kano_at_the_London_Zoological_Gardens_with_Frederick_Lugard.png':
                                                          't1-lugard-sokoto.jpg',
    'Lord_Luggards_rest_house_Mount_Patti.jpg':          't3-lugard-rest-house.jpg',
}

TITLES = {
    ("tfa", "world"):    "The World of the Novel — Things Fall Apart",
    ("tfa", "culture"):  "Igbo Culture — Things Fall Apart",
    ("tfa", "history"):  "Colonial History — Things Fall Apart",
    ("tfa", "figures"):  "Key Figures — Things Fall Apart",
    ("tfa", "novel"):    "The Novel — Things Fall Apart",
    ("pachinko", "world"):    "The World of the Novel — Pachinko",
    ("pachinko", "culture"):  "Korean Identity — Pachinko",
    ("pachinko", "history"):  "Colonial History — Pachinko",
    ("pachinko", "figures"):  "Key Figures — Pachinko",
    ("pachinko", "novel"):    "The Novel — Pachinko",
}

MDX_IMPORTS = """\
import { SectionOpener, SectionTerminator, ProseBlock, SideBySide, PullQuote, TermCard, EndSignature, SpoilerBanner, PinCascadeTimeline, ScrollyMoment, StaticInfographic, DiagramBlock } from '@components/summer-reading';
import ImageCaption from '@components/summer-reading/ImageCaption.astro';
"""


# ── Helpers ────────────────────────────────────────────────────────────────

def unquote(s):
    return s.strip().strip('"').strip("'")

def extract_prop(line, name):
    m = re.search(rf'\|\s*{re.escape(name)}:\s*"([^"]+)"', line)
    if m:
        return m.group(1)
    m = re.search(rf'\|\s*{re.escape(name)}:\s*([^|`\n]+?)(?:\s*\||$)', line)
    if m:
        return m.group(1).strip()
    return None

def strip_gt(line):
    if line.startswith('> '):
        return line[2:]
    if line == '>':
        return ''
    return line

def collect_gt_block(lines, i):
    """Collect consecutive lines starting with '>' into a list of strings."""
    block = []
    while i < len(lines) and lines[i].startswith('>'):
        block.append(strip_gt(lines[i]))
        i += 1
    return block, i

def collect_gt_until_non_gt(lines, i):
    """Collect lines starting with '>' or blank lines within a > block."""
    block = []
    while i < len(lines):
        l = lines[i]
        if l.startswith('>'):
            block.append(strip_gt(l))
            i += 1
        elif l.strip() == '' and i + 1 < len(lines) and lines[i+1].startswith('>'):
            block.append('')
            i += 1
        else:
            break
    return block, i

def skip_notation_lines(lines, i):
    """Skip backtick-bracket and bracket notation lines between annotation and > content."""
    while i < len(lines) and not lines[i].startswith('>') and re.match(r'^\s*`?\[', lines[i]):
        i += 1
    return i

def blocks_to_prose(block_lines):
    return '\n'.join(block_lines).strip()

def make_prose_block(section, align, text):
    return f'<ProseBlock align="{align}">\n\n{text}\n\n</ProseBlock>'

def make_pull_quote(section, text, attribution):
    attr_str = escape_attr(attribution.strip())
    return f'<PullQuote text="{section}" attribution="{attr_str}">\n\n{text}\n\n</PullQuote>'

def make_section_opener(section, eyebrow, heading, background):
    return f'<SectionOpener text="{section}" eyebrow="{escape_attr(eyebrow)}" heading="{escape_attr(heading)}" background="{background}" />'

def make_term_card(section, term, definition_text):
    return f'<TermCard text="{section}" term="{term}">\n\n{definition_text}\n\n</TermCard>'

def escape_attr(s):
    """Escape double quotes in JSX attribute values."""
    return s.replace('"', '&quot;')

def make_image(section, src, figure_num, caption, credit):
    if src and not src.startswith('/'):
        if section == 'tfa' and src in TFA_IMAGE_MAP:
            src = TFA_IMAGE_MAP[src]
        src = f'/images/summer-reading/{section}/{src}'
    alt = escape_attr(caption[:100]) if caption else src
    lines = [
        '<ImageCaption',
        f'  src="{src}"',
        f'  alt="{alt}"',
        f'  figureNumber={{{figure_num}}}',
        f'  caption="{escape_attr(caption)}"',
        f'  credit="{escape_attr(credit)}"',
        f'  accent="{section}"',
        '/>',
    ]
    return '\n'.join(lines)


# ── SideBySide parser ───────────────────────────────────────────────────────

def parse_sidebyside_block(lines, i, section, image_counter):
    """
    Parse a SideBySide block starting at line i (after the `SideBySide` annotation).
    Returns (left_mdx, right_mdx, new_i, new_image_counter).

    Beat sheet format (two patterns):
      Pattern A — simple prose:
        > Left: `ProseBlock`
        > prose text
        >
        > Right: `ProseBlock`
        > prose text

      Pattern B — pullquote + prose (TFA Novel):
        > Left: `PullQuote` ...
        > "Quote"
        > — Attribution
        >
        > Right: `ProseBlock`
        > prose text
    """
    left_lines = []
    right_lines = []
    current = None
    left_type = 'prose'
    right_type = 'prose'

    while i < len(lines):
        l = lines[i]
        # Blank line followed by a non-> line = end of SideBySide
        if l.strip() == '':
            if i + 1 < len(lines) and not lines[i+1].startswith('>'):
                break
            # blank within the block
            if current == 'left':
                left_lines.append('')
            elif current == 'right':
                right_lines.append('')
            i += 1
            continue

        if not l.startswith('>'):
            break

        content = strip_gt(l)

        # Detect Left/Right markers
        left_match = re.match(r'Left:\s*(.*)', content)
        right_match = re.match(r'Right:\s*(.*)', content)

        if left_match:
            current = 'left'
            rest = left_match.group(1).strip()
            if '`PullQuote`' in rest:
                left_type = 'pullquote'
            elif '`ProseBlock`' in rest:
                left_type = 'prose'
            i += 1
            continue

        if right_match:
            current = 'right'
            rest = right_match.group(1).strip()
            if '`PullQuote`' in rest:
                right_type = 'pullquote'
            elif '`ProseBlock`' in rest:
                right_type = 'prose'
            i += 1
            continue

        if current == 'left':
            left_lines.append(content)
        elif current == 'right':
            right_lines.append(content)
        i += 1

    # Build left MDX
    left_mdx = _sidebyside_side(section, left_type, left_lines, image_counter)
    right_mdx = _sidebyside_side(section, right_type, right_lines, image_counter)

    return left_mdx, right_mdx, i, image_counter


def _sidebyside_side(section, side_type, content_lines, image_counter):
    text = '\n'.join(content_lines).strip()
    if side_type == 'pullquote':
        # Split into quote body and attribution
        attr = ''
        quote_lines = []
        for cl in content_lines:
            stripped = cl.strip()
            if stripped.startswith('—') or stripped.startswith('—'):
                attr = stripped
            else:
                quote_lines.append(cl)
        quote_text = '\n'.join(quote_lines).strip()
        return make_pull_quote(section, quote_text, attr)
    else:
        return make_prose_block(section, 'left', text)


# ── Main parser ─────────────────────────────────────────────────────────────

def parse_beatsheet(content, section):
    lines = content.split('\n')
    output = []
    i = 0
    current_bg = 'cream'
    image_counter = [0]

    def emit(s):
        output.append(s)
        output.append('')

    while i < len(lines):
        line = lines[i]

        # Stop at authoring notes
        if re.match(r'^## Notes for MDX', line):
            break

        # Skip section headers
        if re.match(r'^##', line):
            i += 1
            continue

        # Background annotation
        bg_m = re.search(r'`background:\s*(cream|tinted)`', line)
        if bg_m:
            current_bg = bg_m.group(1)
            i += 1
            continue

        # Horizontal rule
        if line.strip() == '---':
            i += 1
            continue

        # Skip motif/bracket notation lines like `[uli single curve motif]`
        if re.match(r'^`\[', line) or re.match(r'^\[.*(motif|bracket|tendril|dot|curve)', line, re.IGNORECASE):
            i += 1
            continue

        # SpoilerBanner — detected by SpoilerBanner keyword or SPOILER header
        if 'SpoilerBanner' in line or 'SPOILER WARNING' in line:
            emit(f'<SpoilerBanner text="{section}" />')
            # Skip any following > lines (custom message — standard component text is used)
            i += 1
            while i < len(lines) and lines[i].startswith('>'):
                i += 1
            continue

        # SectionOpener
        if '`SectionOpener`' in line:
            eyebrow = extract_prop(line, 'eyebrow') or ''
            heading = extract_prop(line, 'heading') or ''
            emit(make_section_opener(section, eyebrow, heading, current_bg))
            i += 1
            continue

        # SectionTerminator
        if '`SectionTerminator`' in line:
            emit(f'<SectionTerminator text="{section}" />')
            i += 1
            continue

        # EndSignature
        if '`EndSignature`' in line:
            emit(f'<EndSignature text="{section}" />')
            i += 1
            continue

        # ScrollyMoment
        if '`ScrollyMoment`' in line:
            m = re.search(r'—\s+\*\*([^*]+)\*\*', line)
            title = m.group(1).strip() if m else 'Scrolly Moment'
            sid = re.sub(r'[^a-z0-9-]', '', title.lower().replace(' ', '-'))[:40]
            emit(
                f'<ScrollyMoment id="{sid}" text="{section}" title="{title}">\n\n'
                f'{{/* Phase F: scrollytelling content will be added here */}}\n\n'
                f'</ScrollyMoment>'
            )
            i += 1
            # Skip spec note lines
            while i < len(lines) and (lines[i].startswith('>') or lines[i].strip() == ''):
                if lines[i].strip() == '' and i + 1 < len(lines) and not lines[i+1].startswith('>'):
                    break
                i += 1
            continue

        # StaticInfographic
        if '`StaticInfographic`' in line:
            m = re.search(r'—\s+\*\*([^*]+)\*\*', line)
            label = m.group(1).strip() if m else 'Infographic'
            emit(
                f'<StaticInfographic text="{section}" label="{label}">\n\n'
                f'{{/* Phase E: static infographic content will be added here */}}\n\n'
                f'</StaticInfographic>'
            )
            i += 1
            while i < len(lines) and (lines[i].startswith('>') or lines[i].strip() == ''):
                if lines[i].strip() == '' and i + 1 < len(lines) and not lines[i+1].startswith('>'):
                    break
                i += 1
            continue

        # DiagramBlock
        if '`DiagramBlock`' in line:
            m = re.search(r'\*\*([^*]+)\*\*', line)
            caption = m.group(1).strip() if m else ''
            emit(
                f'<DiagramBlock caption="{caption}" width="prose">\n\n'
                f'{{/* Phase E: diagram SVG content will be added here */}}\n\n'
                f'</DiagramBlock>'
            )
            i += 1
            while i < len(lines) and (lines[i].startswith('>') or lines[i].strip() == ''):
                if lines[i].strip() == '' and i + 1 < len(lines) and not lines[i+1].startswith('>'):
                    break
                i += 1
            continue

        # SideBySide
        if '`SideBySide`' in line:
            i += 1
            left_mdx, right_mdx, i, _ = parse_sidebyside_block(lines, i, section, image_counter[0])
            emit(f'<SideBySide gap="md">\n<div>\n\n{left_mdx}\n\n</div>\n<div>\n\n{right_mdx}\n\n</div>\n</SideBySide>')
            continue

        # PullQuote (standalone, not inside SideBySide)
        if '`PullQuote`' in line:
            i += 1
            i = skip_notation_lines(lines, i)
            block, i = collect_gt_until_non_gt(lines, i)
            attr_lines = [l for l in block if l.strip().startswith('—') or l.strip().startswith('—')]
            quote_lines = [l for l in block if not (l.strip().startswith('—') or l.strip().startswith('—'))]
            attribution = attr_lines[0].strip() if attr_lines else ''
            quote_text = '\n'.join(quote_lines).strip()
            emit(make_pull_quote(section, quote_text, attribution))
            continue

        # ProseBlock (standalone)
        if '`ProseBlock`' in line:
            align_m = re.search(r'align:\s*(\w+)', line)
            align = align_m.group(1) if align_m else 'left'
            i += 1
            i = skip_notation_lines(lines, i)
            block, i = collect_gt_until_non_gt(lines, i)
            text = blocks_to_prose(block)
            emit(make_prose_block(section, align, text))
            continue

        # TermCard
        if '`TermCard`' in line:
            word = extract_prop(line, 'word') or ''
            if not word:
                m = re.search(r'\|\s*word:\s*([^|`\n]+)', line)
                if m:
                    word = m.group(1).strip()
            i += 1
            i = skip_notation_lines(lines, i)
            block, i = collect_gt_until_non_gt(lines, i)
            def_text = blocks_to_prose(block)
            emit(make_term_card(section, word, def_text))
            continue

        # ImageBlock / ImageCaption
        if '`ImageBlock`' in line or '`ImageCaption`' in line:
            image_counter[0] += 1
            src_m = re.search(r'src:\s*`([^`]+)`', line)
            src = src_m.group(1) if src_m else ''
            i += 1
            i = skip_notation_lines(lines, i)
            block, i = collect_gt_until_non_gt(lines, i)
            caption = ''
            credit = ''
            for bl in block:
                if bl.startswith('Caption:'):
                    caption = bl[8:].strip()
                elif bl.startswith('> Caption:'):
                    caption = bl[10:].strip()
                elif bl.startswith('Credit:') or bl.startswith('© '):
                    credit = bl.split(':', 1)[-1].strip() if ':' in bl else bl
                elif 'CC BY' in bl or '© ' in bl or 'Public domain' in bl or 'public domain' in bl:
                    credit = bl.strip()
                elif bl.startswith('[') or 'Source URL' in bl or 'Integration note' in bl:
                    pass
            emit(make_image(section, src, image_counter[0], caption, credit))
            continue

        # PinCascadeTimeline — parse inline entries
        if '`PinCascadeTimeline`' in line:
            i += 1
            entries = []
            while i < len(lines) and lines[i].startswith('>'):
                entry_line = strip_gt(lines[i]).strip()
                if entry_line:
                    entries.append(f'  {{ year: "", event: "{entry_line}", highlight: false }}')
                i += 1
            entries_str = ',\n'.join(entries) if entries else '  { year: "", event: "", highlight: false }'
            emit(f'<PinCascadeTimeline text="{section}" entries={{[\n{entries_str}\n]}} />')
            continue

        # Default: skip unrecognized annotation lines and blank lines
        i += 1

    return '\n'.join(output)


# ── Entry point ─────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 port_beatsheet.py <section> <spoke>")
        print("  section: pachinko | tfa")
        print("  spoke:   world | culture | history | figures | novel")
        sys.exit(1)

    section = sys.argv[1].lower()
    spoke   = sys.argv[2].lower()

    spoke_file = SPOKE_NUM.get(spoke)
    if not spoke_file:
        print(f"Unknown spoke: {spoke}")
        sys.exit(1)

    beatsheet_path = BEATSHEETS_DIR / f"{section}_{spoke_file}_beatsheet.md"
    if not beatsheet_path.exists():
        print(f"Beat sheet not found: {beatsheet_path}")
        sys.exit(1)

    title = TITLES.get((section, spoke), f"{spoke.title()} — {section.title()}")
    frontmatter = f'---\ntitle: "{title}"\nsection: {section}\nspoke: {spoke}\n---\n\n'

    raw = beatsheet_path.read_text(encoding='utf-8')
    body = parse_beatsheet(raw, section)

    out_path = WORKTREE / f"src/content/summer-reading/{section}/{spoke}.mdx"
    out_path.write_text(frontmatter + MDX_IMPORTS + '\n' + body, encoding='utf-8')
    print(f"Written {out_path.relative_to(WORKTREE)}")


if __name__ == '__main__':
    main()

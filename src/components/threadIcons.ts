export interface ThreadIconDef {
  viewBox: string;
  content: string;
  color: string;
}

export const THREAD_ICONS: Record<string, ThreadIconDef> = {
  // ── Philosophy threads (warm copper) ─────────────────────────────────────
  'human-position': {
    viewBox: '-14 -20 28 42',
    color: '#D4966A',
    content: `
      <circle cx="0" cy="-14" r="5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="0" y1="-9" x2="0" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="-8" y1="-3" x2="8" y2="-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="0" y1="6" x2="-6" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="0" y1="6" x2="6" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    `,
  },
  'knowledge-limits': {
    viewBox: '-13 -12 26 24',
    color: '#C8A84E',
    content: `
      <path d="M-12,0 Q0,-11 12,0 Q0,11 -12,0Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="1.5" fill="currentColor"/>
    `,
  },
  'individual-authority': {
    viewBox: '-12 -16 24 32',
    color: '#6AA3B8',
    content: `
      <line x1="-10" y1="-12" x2="10" y2="-12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="0" y1="-12" x2="0" y2="9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="0" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
    `,
  },

  // ── Painting threads (warm gold/brown) ───────────────────────────────────
  'figure-space': {
    viewBox: '-14 -14 28 28',
    color: '#B8925A',
    content: `
      <rect x="-13" y="-13" width="26" height="26" rx="2" fill="none" stroke="currentColor" stroke-width="1"/>
      <circle cx="0" cy="-5" r="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <path d="M-5,10 L-3,2 L0,0 L3,2 L5,10" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    `,
  },
  'light-shadow': {
    viewBox: '-12 -12 24 24',
    color: '#D4B86A',
    content: `
      <circle cx="0" cy="0" r="11" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <path d="M0,-11 A11,11 0 0,0 0,11Z" fill="currentColor" opacity="0.7"/>
    `,
  },
  'brushwork-surface': {
    viewBox: '-12 -12 26 24',
    color: '#9E8B6E',
    content: `
      <line x1="-10" y1="8" x2="-4" y2="-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="-2" y1="10" x2="4" y2="-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="6" y1="8" x2="12" y2="-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    `,
  },

  // ── Music threads (green-earth) ───────────────────────────────────────────
  'texture-voices': {
    viewBox: '-13 -10 26 20',
    color: '#7EA87E',
    content: `
      <line x1="-12" y1="-8" x2="12" y2="-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="-10" y1="0" x2="10" y2="0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="-12" y1="8" x2="12" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    `,
  },
  'consonance-dissonance': {
    viewBox: '-13 -12 26 22',
    color: '#A0845C',
    content: `
      <path d="M-12,4 Q-6,-10 0,4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M0,4 L4,-8 L8,2 L12,-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    `,
  },
  'structure-freedom': {
    viewBox: '-11 -10 26 20',
    color: '#8B7A62',
    content: `
      <circle cx="-8" cy="-6" r="2" fill="currentColor"/>
      <circle cx="0" cy="-6" r="2" fill="currentColor"/>
      <circle cx="8" cy="-6" r="2" fill="currentColor"/>
      <circle cx="-8" cy="2" r="2" fill="currentColor"/>
      <circle cx="0" cy="2" r="2" fill="currentColor"/>
      <circle cx="12" cy="-2" r="2" fill="currentColor"/>
      <path d="M8,2 Q10,0 12,-2" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2"/>
    `,
  },

  // ── Sculpture threads (terracotta) ────────────────────────────────────────
  'body-volume': {
    viewBox: '-16 -20 32 42',
    color: '#B5714A',
    content: `
      <circle cx="0" cy="-14" r="5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M-8,-7 C-10,-2 -10,4 -8,9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8,-7 C10,-2 10,4 8,9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="-8" y1="-5" x2="8" y2="-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="-7" y1="7" x2="7" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <line x1="-5" y1="-1" x2="5" y2="-1" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
      <line x1="-6" y1="2" x2="6" y2="2" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
      <line x1="-6" y1="5" x2="6" y2="5" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
    `,
  },
  'material-making': {
    viewBox: '-16 -12 32 24',
    color: '#B5714A',
    content: `
      <rect x="1" y="-8" width="13" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <line x1="4" y1="-5" x2="4" y2="3" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.7"/>
      <line x1="7" y1="-5" x2="7" y2="3" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.7"/>
      <line x1="10" y1="-5" x2="10" y2="3" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" opacity="0.7"/>
      <rect x="-10" y="-2" width="3" height="9" rx="0.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="-14" y="-5" width="7" height="4" rx="0.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
    `,
  },
  'space-setting': {
    viewBox: '-18 -13 36 26',
    color: '#B5714A',
    content: `
      <ellipse cx="-9" cy="-7" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <rect x="-11" y="-4" width="4" height="8" rx="0" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <rect x="-12" y="4" width="6" height="2" rx="0" fill="none" stroke="currentColor" stroke-width="1.2"/>
      <line x1="0" y1="-11" x2="0" y2="7" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 1.5" stroke-linecap="round" opacity="0.7"/>
      <line x1="-1" y1="6" x2="1" y2="9" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
      <line x1="1" y1="6" x2="-1" y2="9" stroke="currentColor" stroke-width="1" stroke-linecap="round"/>
      <ellipse cx="9" cy="-7" rx="4" ry="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <line x1="6" y1="-4" x2="12" y2="-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    `,
  },
};

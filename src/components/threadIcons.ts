export interface ThreadIconDef {
  viewBox: string;
  content: string;
  color: string;
}

export const THREAD_ICONS: Record<string, ThreadIconDef> = {
  // ── Philosophy threads ────────────────────────────────────────────────────
  'human-position': {
    viewBox: '0 0 40 40',
    color: '#C9A24B',
    content: `
      <rect x="8" y="6" width="24" height="28" fill="none" stroke="currentColor"/>
      <circle cx="20" cy="16" r="3" fill="none" stroke="currentColor"/>
      <path d="M14 28 C 14 22, 26 22, 26 28" fill="none" stroke="currentColor"/>
    `,
  },
  'knowledge-limits': {
    viewBox: '0 0 40 40',
    color: '#A89553',
    content: `
      <path d="M8 12 L 20 16 L 32 12 L 32 30 L 20 34 L 8 30 Z" fill="none" stroke="currentColor"/>
      <line x1="20" y1="16" x2="20" y2="34" stroke="currentColor"/>
      <line x1="6" y1="8" x2="34" y2="8" stroke-dasharray="2 3" stroke="currentColor"/>
    `,
  },
  'individual-authority': {
    viewBox: '0 0 40 40',
    color: '#C47A5A',
    content: `
      <path d="M6 16 A 14 14 0 0 1 34 16" fill="none" stroke="currentColor"/>
      <circle cx="20" cy="28" r="2.5" fill="currentColor" stroke="none"/>
      <line x1="20" y1="16" x2="20" y2="25" stroke-dasharray="2 2" stroke="currentColor"/>
    `,
  },

  // ── Painting threads ──────────────────────────────────────────────────────
  'figure-space': {
    viewBox: '0 0 40 40',
    color: '#D9A842',
    content: `
      <line x1="3" y1="34" x2="37" y2="34" stroke="currentColor"/>
      <circle cx="17" cy="11" r="3.5" fill="none" stroke="currentColor"/>
      <path d="M17 14.5 L 17 30 M 17 19 L 13 25 M 17 19 L 21 25 M 17 30 L 14 34 M 17 30 L 20 34" fill="none" stroke="currentColor"/>
      <circle cx="30" cy="22" r="2" fill="none" stroke="currentColor"/>
      <path d="M30 24 L 30 31 M 30 26.5 L 28 30 M 30 26.5 L 32 30" fill="none" stroke="currentColor"/>
      <circle cx="9" cy="9" r=".8" fill="currentColor" stroke="none"/>
      <circle cx="25" cy="6" r=".8" fill="currentColor" stroke="none"/>
      <circle cx="9" cy="20" r=".8" fill="currentColor" stroke="none"/>
      <circle cx="17" cy="6" r="1.3" fill="currentColor" stroke="none"/>
    `,
  },
  'light-shadow': {
    viewBox: '0 0 40 40',
    color: '#C94C7C',
    content: `
      <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor"/>
      <line x1="20" y1="9" x2="20" y2="4" stroke="currentColor"/>
      <line x1="20" y1="31" x2="20" y2="36" stroke="currentColor"/>
      <line x1="9" y1="20" x2="4" y2="20" stroke="currentColor"/>
      <line x1="31" y1="20" x2="36" y2="20" stroke="currentColor"/>
      <line x1="12.2" y1="12.2" x2="8.7" y2="8.7" stroke="currentColor"/>
      <line x1="27.8" y1="27.8" x2="31.3" y2="31.3" stroke="currentColor"/>
      <line x1="27.8" y1="12.2" x2="31.3" y2="8.7" stroke="currentColor"/>
      <line x1="12.2" y1="27.8" x2="8.7" y2="31.3" stroke="currentColor"/>
      <line x1="14.3" y1="9.6" x2="12.6" y2="5.0" opacity=".55" stroke="currentColor"/>
      <line x1="25.7" y1="30.4" x2="27.4" y2="35.0" opacity=".55" stroke="currentColor"/>
      <line x1="9.6" y1="25.7" x2="5.0" y2="27.4" opacity=".55" stroke="currentColor"/>
      <line x1="30.4" y1="14.3" x2="35.0" y2="12.6" opacity=".55" stroke="currentColor"/>
      <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none"/>
    `,
  },
  'brushwork-surface': {
    viewBox: '0 0 40 40',
    color: '#4AB39A',
    content: `
      <rect x="6" y="6" width="28" height="28" fill="none" stroke="currentColor"/>
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
      <circle cx="20" cy="12" r="1" fill="currentColor" stroke="none"/>
      <circle cx="28" cy="12" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>
      <circle cx="20" cy="20" r="1" fill="currentColor" stroke="none"/>
      <circle cx="28" cy="20" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="28" r="1" fill="currentColor" stroke="none"/>
      <circle cx="20" cy="28" r="1" fill="currentColor" stroke="none"/>
      <circle cx="28" cy="28" r="1" fill="currentColor" stroke="none"/>
      <rect x="9" y="9" width="22" height="22" stroke-dasharray="1.5 2" opacity=".55" fill="none" stroke="currentColor"/>
    `,
  },

  // ── Music threads ─────────────────────────────────────────────────────────
  'texture-voices': {
    viewBox: '0 0 40 40',
    color: '#D9A842',
    content: `
      <path d="M4 20 Q 10 12, 16 20 T 28 20 T 40 20" fill="none" stroke="currentColor"/>
      <circle cx="10" cy="16" r="1" fill="currentColor" stroke="none"/>
      <circle cx="22" cy="24" r="1" fill="currentColor" stroke="none"/>
      <circle cx="34" cy="16" r="1" fill="currentColor" stroke="none"/>
    `,
  },
  'consonance-dissonance': {
    viewBox: '0 0 40 40',
    color: '#C94C7C',
    content: `
      <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor"/>
      <path d="M6 20 A 14 14 0 0 1 34 20" fill="none" stroke="currentColor"/>
      <line x1="12" y1="20" x2="28" y2="20" stroke-dasharray="2 2" stroke="currentColor"/>
      <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none"/>
    `,
  },
  'structure-freedom': {
    viewBox: '0 0 40 40',
    color: '#4AB39A',
    content: `
      <path d="M4 20 Q 9 14, 14 20 Q 19 26, 24 20 Q 29 14, 34 20" fill="none" stroke="currentColor"/>
      <line x1="14" y1="10" x2="14" y2="30" stroke-dasharray="1.5 2.5" opacity=".6" stroke="currentColor"/>
      <line x1="24" y1="10" x2="24" y2="30" stroke-dasharray="1.5 2.5" opacity=".6" stroke="currentColor"/>
      <circle cx="9" cy="20" r=".9" fill="currentColor" stroke="none"/>
      <circle cx="19" cy="20" r=".9" fill="currentColor" stroke="none"/>
      <circle cx="29" cy="20" r=".9" fill="currentColor" stroke="none"/>
    `,
  },

  // ── Sculpture threads ─────────────────────────────────────────────────────
  'body-volume': {
    viewBox: '0 0 40 40',
    color: '#D9A842',
    content: `
      <line x1="14" y1="4" x2="14" y2="36" stroke="currentColor"/>
      <line x1="26" y1="4" x2="26" y2="36" stroke="currentColor"/>
      <circle cx="20" cy="11" r="3.5" fill="none" stroke="currentColor"/>
      <line x1="20" y1="15" x2="20" y2="32" stroke="currentColor"/>
      <line x1="20" y1="19" x2="16" y2="26" stroke="currentColor"/>
      <line x1="20" y1="19" x2="24" y2="26" stroke="currentColor"/>
      <circle cx="20" cy="11" r="1" fill="currentColor" stroke="none"/>
    `,
  },
  'material-making': {
    viewBox: '0 0 40 40',
    color: '#C94C7C',
    content: `
      <rect x="6" y="18" width="28" height="16" fill="none" stroke="currentColor"/>
      <line x1="10" y1="22" x2="30" y2="22" stroke-dasharray="2 2" stroke="currentColor"/>
      <line x1="10" y1="26" x2="30" y2="26" stroke-dasharray="2 2" stroke="currentColor"/>
      <line x1="10" y1="30" x2="30" y2="30" stroke-dasharray="2 2" stroke="currentColor"/>
      <path d="M18 6 L 22 6 L 20 14 Z" fill="none" stroke="currentColor"/>
      <line x1="20" y1="14" x2="20" y2="18" stroke="currentColor"/>
      <circle cx="20" cy="16" r="1" fill="currentColor" stroke="none"/>
    `,
  },
  'space-setting': {
    viewBox: '0 0 40 40',
    color: '#4AB39A',
    content: `
      <path d="M6 36 L 6 16 L 20 6 L 34 16 L 34 36 Z" fill="none" stroke="currentColor"/>
      <path d="M14 36 L 14 24 A 6 6 0 0 1 26 24 L 26 36" fill="none" stroke="currentColor"/>
      <line x1="20" y1="24" x2="20" y2="36" stroke="currentColor"/>
      <circle cx="20" cy="14" r="1.5" fill="currentColor" stroke="none"/>
    `,
  },
};

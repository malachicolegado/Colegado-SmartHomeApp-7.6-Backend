// Calm, cozy evening theme: soft blue-slate surfaces, warm off-white text,
// and a single gentle blue accent for anything that is on.
export const Palette = {
  background: '#0E1522',
  header: '#0E1522',
  drawer: '#111A29',
  surface: '#162030',
  surfaceRaised: '#1B2739',
  outline: '#243247',
  divider: '#223044',
  text: '#EFEDE8',
  muted: '#94A0B4',
  subtle: '#5F6B80',
  accent: '#7AAEF0',
  onAccent: '#0E1522',
  track: '#26344A',
  success: '#7CC4A4',
  danger: '#E0848F',
  warning: '#E3B873',
};

/** Appends an alpha channel to a `#RRGGBB` color. */
export function withAlpha(hex: string, alpha: number) {
  const channel = Math.round(Math.min(Math.max(alpha, 0), 1) * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hex}${channel}`;
}

/** A faint colored halo, used as a `boxShadow` on things that are switched on. */
export function glow(color: string, radius = 14, alpha = 0.18) {
  return `0px 0px ${radius}px ${withAlpha(color, alpha)}`;
}

export const Shadow = {
  card: '0px 8px 20px rgba(0, 0, 0, 0.28)',
};

export const HomeRoom = 'Living Room';

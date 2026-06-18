export const colors = {
  rose: '#8B0000',
  roseLight: '#A52A2A',
  roseMuted: 'rgba(139, 0, 0, 0.12)',
  roseBorder: 'rgba(139, 0, 0, 0.25)',

  bg: '#FAF7F5',
  bgElevated: '#FFFFFF',
  bgOverlay: 'rgba(28, 25, 23, 0.6)',
  surfaceMuted: '#F0EBE8',
  surfaceGlass: 'rgba(255, 255, 255, 0.08)',

  textPrimary: '#1C1917',
  textSecondary: '#78716C',
  textOnRose: '#FFFFFF',
  textAccent: '#8B0000',

  error: '#B91C1C',
  errorMuted: 'rgba(185, 28, 28, 0.08)',

  tintBlush: '#F5E6E8',
  tintPeach: '#F5EDE6',
  tintSnow: '#EEF2F6',
  tintCream: '#F7F3ED',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 12,
  md: 20,
  lg: 28,
  xl: 40,
  full: 999,
} as const;

export const shadows = {
  diffusion: {
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    elevation: 4,
  },
  card: {
    shadowColor: '#8B0000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },
} as const;

export const glass = {
  blurIntensity: 40,
  tint: 'light' as const,
  border: 'rgba(255, 255, 255, 0.18)',
  innerHighlight: 'rgba(255, 255, 255, 0.35)',
} as const;

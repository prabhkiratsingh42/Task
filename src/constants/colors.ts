export const Colors = {

  background: '#0F1117',
  surface: '#1C2033',
  surfaceElevated: '#252A42',
  surfaceBorder: '#363D5C',

  primary: '#7C6EFF',
  primaryLight: '#A89BFF',
  primaryDark: '#5A4ECC',
  primarySoft: 'rgba(124, 110, 255, 0.18)',


  statusPending: '#FBBF24',
  statusPendingBg: 'rgba(251, 191, 36, 0.15)',
  statusInReview: '#60A5FA',
  statusInReviewBg: 'rgba(96, 165, 250, 0.15)',
  statusResolved: '#34D399',
  statusResolvedBg: 'rgba(52, 211, 153, 0.15)',


  textPrimary: '#EDEEFF',
  textSecondary: '#B4B9D4',
  textMuted: '#8589A6',
  textOnPrimary: '#FFFFFF',


  inputBackground: '#1C2033',
  inputBorder: '#363D5C',
  inputBorderFocused: '#7C6EFF',
  inputPlaceholder: '#6E7491',


  error: '#F87171',
  errorBg: 'rgba(248, 113, 113, 0.12)',
  success: '#34D399',
  divider: '#252A42',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  shadowColor: '#000000',
} as const;

export type ColorKeys = keyof typeof Colors;

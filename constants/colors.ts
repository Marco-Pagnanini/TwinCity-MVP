/**
 * TwinCity — Color Tokens
 *
 * Palette derived from the TwinCity design system.
 * Each semantic role maps to a primary surface + text-on-surface pair.
 */

// ─── Brand palette ────────────────────────────────────────────────────────────

export const Palette = {
  /** Primary interactive colour — roads / links / CTAs */
  accent: '#2563EB',
  accentLight: '#3B82F6',
  accentDark: '#1D4ED8',

  /** Near-black used for text, icons and UI surfaces */
  ink: '#1F2937',
  inkLight: '#374151',
  inkSubtle: '#6B7280',

  /** Success / validated / accessible */
  ok: '#16A34A',
  okLight: '#22C55E',
  okSurface: '#DCFCE7',

  /** Warning / in-review / needs attention */
  warn: '#D97706',
  warnLight: '#F59E0B',
  warnSurface: '#FEF3C7',

  /** Error / rejected / missing */
  err: '#DC2626',
  errLight: '#EF4444',
  errSurface: '#FEE2E2',

  // ─── Neutrals ───────────────────────────────────────────────────────────────
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',
} as const;

// ─── Semantic tokens ──────────────────────────────────────────────────────────

export const Colors = {
  // Backgrounds
  background: Palette.gray50,
  surface: Palette.white,
  surfaceElevated: Palette.white,
  overlay: 'rgba(17, 24, 39, 0.5)',

  // Text
  textPrimary: Palette.ink,
  textSecondary: Palette.inkSubtle,
  textDisabled: Palette.gray400,
  textOnAccent: Palette.white,
  textOnDark: Palette.white,

  // Interactive
  primary: Palette.accent,
  primaryHover: Palette.accentDark,
  primaryDisabled: Palette.gray300,

  // Borders
  border: Palette.gray200,
  borderSubtle: Palette.gray100,
  borderStrong: Palette.gray300,

  // Status — validation states
  validated: Palette.ok,
  validatedSurface: Palette.okSurface,
  inReview: Palette.warn,
  inReviewSurface: Palette.warnSurface,
  rejected: Palette.err,
  rejectedSurface: Palette.errSurface,
  present: Palette.ok,
  missing: Palette.err,
} as const;

export type ColorKey = keyof typeof Colors;
export type PaletteKey = keyof typeof Palette;

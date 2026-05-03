/**
 * TwinCity — Typography Tokens
 *
 * Three font families from the TwinCity design system:
 *  - Fredoka      → Display / headings
 *  - Nunito       → Body / UI text
 *  - JetBrains Mono → Coordinates, AI scores, monospaced data
 *
 * Load these via expo-google-fonts or a custom font asset in your app entry.
 */

// ─── Font families ────────────────────────────────────────────────────────────

export const FontFamily = {
  // ── Fredoka (display / headings) ──────────────────────────────────────────
  /** Regular weight — Fredoka */
  display: 'Fredoka',
  /** SemiBold weight — Fredoka-SemiBold */
  displaySemiBold: 'Fredoka-SemiBold',
  /** Bold weight — Fredoka-Bold */
  displayBold: 'Fredoka-Bold',

  // ── Nunito (body / UI text) ───────────────────────────────────────────────
  /** Regular weight — Nunito */
  body: 'Nunito',
  /** SemiBold weight — Nunito-SemiBold */
  bodySemiBold: 'Nunito-SemiBold',
  /** Bold weight — Nunito-Bold */
  bodyBold: 'Nunito-Bold',

  // ── JetBrains Mono (coordinates / scores) ────────────────────────────────
  /** Regular weight — JetBrainsMono */
  mono: 'JetBrainsMono',
} as const;

// ─── Font weights ──────────────────────────────────────────────────────────────

export const FontWeight = {
  regular: '400',
  semibold: '600',
  bold: '700',
} as const;

// ─── Font sizes (sp — scale-independent pixels) ───────────────────────────────

export const FontSize = {
  /** Tiny labels, badges */
  xs: 11,
  /** Secondary body, captions */
  sm: 13,
  /** Primary body text */
  md: 15,
  /** Sub-headings, emphasized body */
  lg: 17,
  /** Section titles */
  xl: 20,
  /** Screen headings */
  '2xl': 24,
  /** Display / hero headings */
  '3xl': 30,
  /** Large display */
  '4xl': 36,
  /** Extra-large display */
  '5xl': 48,
} as const;

// ─── Line heights ──────────────────────────────────────────────────────────────

export const LineHeight = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;

// ─── Letter spacing ────────────────────────────────────────────────────────────

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
} as const;

// ─── Pre-composed text styles ─────────────────────────────────────────────────
//
// Use these objects directly in StyleSheet.create() or spread into a style prop.

export const TextStyle = {
  /** Hero title — Fredoka, 5xl */
  displayLarge: {
    fontFamily: FontFamily.display,
    fontSize: FontSize['5xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['5xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },

  /** Screen heading — Fredoka, 3xl */
  displayMedium: {
    fontFamily: FontFamily.display,
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['3xl'] * LineHeight.snug,
    letterSpacing: LetterSpacing.tight,
  },

  /** Section heading — Nunito, xl, semibold */
  headingLarge: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.xl * LineHeight.snug,
  },

  /** Sub-heading — Nunito, lg, semibold */
  headingSmall: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.lg * LineHeight.snug,
  },

  /** Primary body — Nunito, md, regular */
  bodyLarge: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.md * LineHeight.normal,
  },

  /** Secondary body — Nunito, sm, regular */
  bodySmall: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
  },

  /** Tiny caption / badge label — Nunito, xs */
  caption: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.xs * LineHeight.normal,
    letterSpacing: LetterSpacing.wide,
  },

  /** Label / button text — Nunito, md, semibold */
  label: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.md * LineHeight.snug,
  },

  /** GPS coordinates or AI score — JetBrains Mono, sm */
  mono: {
    fontFamily: FontFamily.mono,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  /** Monospaced numeric display — JetBrains Mono, md */
  monoLarge: {
    fontFamily: FontFamily.mono,
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.md * LineHeight.normal,
  },
} as const;

export type FontFamilyKey = keyof typeof FontFamily;
export type FontSizeKey = keyof typeof FontSize;
export type TextStyleKey = keyof typeof TextStyle;

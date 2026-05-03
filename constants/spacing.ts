/**
 * TwinCity — Spacing & Layout Tokens
 *
 * A 4-point base grid. All spacing values are multiples of 4dp.
 */

// ─── Spacing scale ────────────────────────────────────────────────────────────

export const Spacing = {
  /** 2dp — hairline gap, icon nudges */
  '0.5': 2,
  /** 4dp */
  '1': 4,
  /** 8dp */
  '2': 8,
  /** 12dp */
  '3': 12,
  /** 16dp — standard content padding */
  '4': 16,
  /** 20dp */
  '5': 20,
  /** 24dp */
  '6': 24,
  /** 32dp */
  '8': 32,
  /** 40dp */
  '10': 40,
  /** 48dp */
  '12': 48,
  /** 64dp */
  '16': 64,
  /** 80dp */
  '20': 80,
} as const;

// ─── Border radius ────────────────────────────────────────────────────────────

export const Radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

// ─── Elevation / shadow ───────────────────────────────────────────────────────

export const Shadow = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

export type SpacingKey = keyof typeof Spacing;
export type RadiusKey = keyof typeof Radius;
export type ShadowKey = keyof typeof Shadow;

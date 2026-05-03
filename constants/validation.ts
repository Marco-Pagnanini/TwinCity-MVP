/**
 * TwinCity — Validation State Tokens
 *
 * Semantic tokens for the five report validation states shown in the design
 * system: Validated, In Review, Rejected, PRESENT, MISSING.
 *
 * Each state provides:
 *  - label       Human-readable display name
 *  - color       Foreground / icon color
 *  - surface     Background chip / badge color
 *  - border      Optional border color (same hue, slightly stronger)
 */

import { Colors, Palette } from './colors';

export type ValidationStatus =
  | 'validated'
  | 'inReview'
  | 'rejected'
  | 'present'
  | 'missing';

export interface ValidationStateToken {
  label: string;
  color: string;
  surface: string;
  border: string;
}

export const ValidationState: Record<ValidationStatus, ValidationStateToken> = {
  validated: {
    label: 'Validated',
    color: Colors.validated,
    surface: Colors.validatedSurface,
    border: Palette.okLight,
  },
  inReview: {
    label: 'In review',
    color: Colors.inReview,
    surface: Colors.inReviewSurface,
    border: Palette.warnLight,
  },
  rejected: {
    label: 'Rejected',
    color: Colors.rejected,
    surface: Colors.rejectedSurface,
    border: Palette.errLight,
  },
  present: {
    label: 'PRESENT',
    color: Colors.present,
    surface: Colors.validatedSurface,
    border: Palette.okLight,
  },
  missing: {
    label: 'MISSING',
    color: Colors.missing,
    surface: Colors.rejectedSurface,
    border: Palette.errLight,
  },
} as const;

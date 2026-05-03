import { Colors, Palette } from './colors';

export interface ValidationStateToken {
  label: string;
  color: string;
  surface: string;
  border: string;
}

// ─── Validation status (AI / community review result) ─────────────────────────

export type ValidationStatus = 'validated' | 'inReview' | 'rejected';

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
};

// ─── Presence status (physical state of the barrier) ─────────────────────────

export type PresenceStatus = 'missing' | 'present';

export const PresenceState: Record<PresenceStatus, ValidationStateToken> = {
  missing: {
    label: 'Missing',
    color: Colors.missing,
    surface: Colors.rejectedSurface,
    border: Palette.errLight,
  },
  present: {
    label: 'Present',
    color: Colors.present,
    surface: Colors.validatedSurface,
    border: Palette.okLight,
  },
};

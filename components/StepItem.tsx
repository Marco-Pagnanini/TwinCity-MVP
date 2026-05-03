/**
 * TwinCity — StepItem component
 *
 * A single numbered step row used in feature / how-it-works lists.
 * Shows: number badge | title + description | trailing icon.
 *
 * Usage:
 *   <StepItem
 *     number={1}
 *     title="Spot a barrier"
 *     description="Missing ramp, broken curb, no audio crossing"
 *     icon={<Feather name="camera" size={18} color={Colors.textSecondary} />}
 *   />
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {
  Colors,
  FontFamily,
  FontSize,
  Palette,
  Radius,
  Spacing,
} from '@/constants';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface StepItemProps {
  number: number;
  title: string;
  description: string;
  /** Any ReactNode rendered as the trailing icon */
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function StepItem({
  number,
  title,
  description,
  icon,
  style,
}: StepItemProps) {
  return (
    <View style={[styles.row, style]}>
      {/* Number badge */}
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{number}</Text>
      </View>

      {/* Text content */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Trailing icon */}
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing['3'],
  },

  // ── Number badge ─────────────────────────────────────────────────────────────
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  numberText: {
    fontFamily: FontFamily.bodyBold,
    fontSize: FontSize.xs,
    color: Colors.textOnAccent,
  },

  // ── Text ─────────────────────────────────────────────────────────────────────
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  description: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },

  // ── Icon ─────────────────────────────────────────────────────────────────────
  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});

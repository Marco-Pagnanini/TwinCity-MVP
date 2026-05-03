/**
 * TwinCity — LoginFeatureCard component
 *
 * Small icon + label card used on the login/onboarding screen to communicate
 * the three core app features: Snap, AI tags, Verified.
 *
 * Usage:
 *   <LoginFeatureCard icon={<CameraIcon />} label="Snap" />
 *
 * The card accepts an optional `style` prop so colours, shadow or size can be
 * overridden per-use without touching this file.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle as RNTextStyle,
} from 'react-native';
import { Colors, Radius, Shadow, Spacing, TextStyle } from '@/constants';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface LoginFeatureCardProps {
  /** Any React element rendered as the icon (e.g. an SVG or emoji component) */
  icon: React.ReactNode;
  /** Short label shown below the icon */
  label: string;
  /** Override the card container style */
  style?: StyleProp<ViewStyle>;
  /** Override the label text style */
  labelStyle?: StyleProp<RNTextStyle>;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function LoginFeatureCard({
  icon,
  label,
  style,
  labelStyle,
}: LoginFeatureCardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={[styles.label, labelStyle]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing['2'],
    paddingVertical: Spacing['3'],
    paddingHorizontal: Spacing['4'],
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: 72,
    ...Shadow.sm,
  },

  iconWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    ...TextStyle.caption,
    color: Colors.textSecondary,
  },
});

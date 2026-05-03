/**
 * TwinCity — Badge component
 *
 * A small pill label used for status, version tags or counts.
 *
 * Usage:
 *   <Badge label="BETA" />
 *   <Badge label="NEW" color={Colors.validated} textColor="#fff" />
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle as RNTextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Colors, FontFamily, FontSize, Palette, Radius, Spacing } from '@/constants';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface BadgeProps {
  label: string;
  /** Background color — defaults to a light accent tint */
  color?: string;
  /** Label color — defaults to accent */
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<RNTextStyle>;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Badge({
  label,
  color = Palette.accentLight + '22', // ~13% opacity tint
  textColor = Colors.primary,
  style,
  textStyle,
}: BadgeProps) {
  return (
    <View style={[styles.pill, { backgroundColor: color }, style]}>
      <Text style={[styles.label, { color: textColor }, textStyle]}>
        {label}
      </Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  pill: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing['3'],
    paddingVertical: Spacing['0.5'],
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    letterSpacing: 0.4,
  },
});

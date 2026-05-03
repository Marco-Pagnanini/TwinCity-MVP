/**
 * TwinCity — AppHeader component
 *
 * Top-of-screen bar with the brand logo, app name and an optional badge.
 * Used on the onboarding / login screen.
 *
 * Usage:
 *   <AppHeader badge="BETA" />
 *   <AppHeader />                    // no badge
 */

import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Badge from './Badge';
import { Colors, FontFamily, FontSize, Spacing } from '@/constants';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface AppHeaderProps {
  /** Optional badge label (e.g. "BETA") */
  badge?: string;
  style?: StyleProp<ViewStyle>;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function AppHeader({ badge, style }: AppHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Brand: icon + name */}
      <View style={styles.brand}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.name}>TwinCity</Text>
      </View>

      {/* Optional badge */}
      {badge ? <Badge label={badge} /> : null}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing['2'],
  },
  logo: {
    width: 28,
    height: 28,
  },
  name: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
});

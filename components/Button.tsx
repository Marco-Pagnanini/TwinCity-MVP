/**
 * TwinCity — Button component
 *
 * Supports three built-in variants (primary | secondary | ghost) plus full
 * style-override through the `style` and `textStyle` props so any screen can
 * tweak colours, size or radius without touching this file.
 *
 * Usage:
 *   <Button label="Create account" onPress={handleCreate} />
 *   <Button label="I already have one" variant="ghost" onPress={handleLogin} />
 *   <Button label="Custom" style={{ borderRadius: 4 }} onPress={fn} />
 */

import { Colors, Palette, Radius, Shadow, Spacing, TextStyle } from '@/constants';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  TextStyle as RNTextStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

// ─── Types ─────────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps {
  /** Text shown inside the button */
  label: string;
  /** Called when the button is pressed */
  onPress: () => void;
  /** Visual style — defaults to 'primary' */
  variant?: ButtonVariant;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Show a loading spinner instead of the label */
  loading?: boolean;
  /** Extra styles merged on top of the container */
  style?: StyleProp<ViewStyle>;
  /** Extra styles merged on top of the label text */
  textStyle?: StyleProp<RNTextStyle>;
}

// ─── Shadow map (static — avoids dynamic key lookup type errors) ──────────────

const SHADOW_BY_VARIANT: Record<ButtonVariant, object> = {
  primary: { ...Shadow.md, backgroundColor: Colors.primary, borderRadius: Radius.xl },
  secondary: { ...Shadow.sm, backgroundColor: Colors.surface, borderRadius: Radius.xl },
  ghost: { ...Shadow.sm, backgroundColor: Colors.surface, borderRadius: Radius.xl },
};

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  // Shadow must live on a View — Pressable ignores shadow props on RN.
  const shadowStyle = isDisabled ? Shadow.none : SHADOW_BY_VARIANT[variant];

  return (
    <View style={[styles.shadowWrapper, shadowStyle, style]}>
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        style={({ pressed }) => [
          styles.base,
          styles[variant],
          isDisabled && styles.disabled,
          pressed && !isDisabled && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
      >
        {loading ? (
          <ActivityIndicator
            color={variant === 'primary' ? Colors.textOnAccent : Colors.primary}
            size="small"
          />
        ) : (
          <Text
            style={[
              styles.label,
              styles[`${variant}Label` as keyof typeof styles],
              isDisabled && styles.labelDisabled,
              textStyle,
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
      </Pressable>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── Shadow wrapper (View) — shadows MUST live here, not on Pressable ────────
  shadowWrapper: {
    width: '100%',
    borderRadius: Radius.xl,
  },

  // ── Pressable base — inner layout only ─────────────────────────────────────
  base: {
    height: 52,
    borderRadius: Radius.xl,        // mirrors wrapper so ripple is clipped
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing['6'],
    overflow: 'hidden',             // clips Android ripple to rounded corners
  },

  // ── Variants (bg + border only — NO shadow here) ──────────────────────────
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // ── Pressed state ──────────────────────────────────────────────────────────
  pressed: {
    opacity: 0.82,
  },

  // ── Disabled state ─────────────────────────────────────────────────────────
  disabled: {
    backgroundColor: Colors.primaryDisabled,
    borderColor: 'transparent',
  },

  // ── Labels ────────────────────────────────────────────────────────────────
  label: {
    ...TextStyle.label,
  },
  primaryLabel: {
    color: Colors.textOnAccent,
  },
  secondaryLabel: {
    color: Colors.primary,
  },
  ghostLabel: {
    color: Colors.primary,
  },
  labelDisabled: {
    color: Palette.gray500,
  },
});

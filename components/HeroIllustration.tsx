/**
 * TwinCity — HeroIllustration component
 *
 * A fully View-based illustration that recreates the onboarding hero:
 *  - City skyline (buildings)
 *  - Street / sidewalk band
 *  - AI bounding box with confidence label
 *  - Phone mockup overlay
 *  - Location & report-count pills
 *
 * No images required — rendered entirely with RN primitives.
 *
 * Usage:
 *   <HeroIllustration />
 *   <HeroIllustration style={{ marginHorizontal: -16 }} />
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { FontFamily, FontSize, Palette, Radius, Spacing } from '@/constants';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface HeroIllustrationProps {
  style?: StyleProp<ViewStyle>;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function HeroIllustration({ style }: HeroIllustrationProps) {
  return (
    <View style={[styles.container, style]}>
      {/* ── Sky background ───────────────────────────────────────────────── */}
      <View style={styles.sky} />

      {/* ── Buildings ────────────────────────────────────────────────────── */}
      <View style={[styles.building, { left: 18, bottom: '38%', height: 72, width: 28 }]} />
      <View style={[styles.building, { left: 54, bottom: '38%', height: 104, width: 38 }]} />
      <View style={[styles.building, { left: 102, bottom: '38%', height: 56, width: 32 }]} />
      <View style={[styles.building, { right: 14, bottom: '38%', height: 88, width: 40 }]} />

      {/* ── Street / sidewalk band ───────────────────────────────────────── */}
      <View style={styles.street} />

      {/* ── AI bounding box + label ──────────────────────────────────────── */}
      <View style={styles.aiBoundingBox}>
        {/* Confidence label */}
        <View style={styles.aiLabelPill}>
          <Text style={styles.aiLabelText}>AI · ramp missing · 94%</Text>
        </View>
      </View>

      {/* ── Phone mockup ─────────────────────────────────────────────────── */}
      <View style={styles.phone}>
        {/* Screen content placeholder */}
        <View style={styles.phoneScreen}>
          <View style={styles.phoneScreenBar} />
        </View>
        {/* Shutter button */}
        <View style={styles.shutterRing}>
          <View style={styles.shutterDot} />
        </View>
      </View>

      {/* ── Bottom pills ─────────────────────────────────────────────────── */}
      <View style={styles.pillsColumn}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>📍 Via Roma 24</Text>
        </View>
        <View style={styles.pill}>
          <Text style={styles.pillText}>👥 12 verified nearby</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const SKY   = '#D6E4F7';
const BUILDING = '#A0AEC0';
const STREET   = '#B8956A';
const STREET_EDGE = '#8A6D4A';

const styles = StyleSheet.create({
  container: {
    height: 210,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    backgroundColor: SKY,
    position: 'relative',
  },

  // ── Background ───────────────────────────────────────────────────────────────
  sky: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: SKY,
  },

  // ── Buildings ────────────────────────────────────────────────────────────────
  building: {
    position: 'absolute',
    backgroundColor: BUILDING,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  // ── Street ───────────────────────────────────────────────────────────────────
  street: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '42%',
    backgroundColor: STREET,
    borderTopWidth: 3,
    borderTopColor: STREET_EDGE,
  },

  // ── AI bounding box ──────────────────────────────────────────────────────────
  aiBoundingBox: {
    position: 'absolute',
    left: 24,
    bottom: '30%',
    width: 140,
    height: 44,
    borderWidth: 1.5,
    borderColor: Palette.accent,
    borderStyle: 'dashed',
    borderRadius: Radius.sm,
  },
  aiLabelPill: {
    position: 'absolute',
    top: -13,
    left: -1,
    backgroundColor: Palette.accent,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing['2'],
    paddingVertical: 2,
  },
  aiLabelText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs - 1,
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  // ── Phone mockup ─────────────────────────────────────────────────────────────
  phone: {
    position: 'absolute',
    right: 20,
    bottom: 12,
    width: 80,
    height: 110,
    backgroundColor: Palette.ink,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: Palette.inkLight,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing['2'],
  },
  phoneScreen: {
    flex: 1,
    width: '82%',
    backgroundColor: SKY,
    borderRadius: 8,
    marginTop: Spacing['1'],
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: Spacing['1'],
  },
  phoneScreenBar: {
    width: '65%',
    height: 8,
    backgroundColor: Palette.accent,
    borderRadius: Radius.sm,
    opacity: 0.7,
  },
  shutterRing: {
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    borderWidth: 2,
    borderColor: Palette.gray400,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  shutterDot: {
    width: 12,
    height: 12,
    borderRadius: Radius.full,
    backgroundColor: Palette.white,
  },

  // ── Location pills ────────────────────────────────────────────────────────────
  pillsColumn: {
    position: 'absolute',
    left: 12,
    bottom: 12,
    gap: 6,
  },
  pill: {
    backgroundColor: 'rgba(17, 24, 39, 0.82)',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing['3'],
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  pillText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: '#FFFFFF',
  },
});

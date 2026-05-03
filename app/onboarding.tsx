/**
 * TwinCity — Onboarding / Sign-up screen
 *
 * Implements the "01 · Onboarding" design:
 *  ┌─────────────────────────────────────┐
 *  │ AppHeader                  [BETA]   │
 *  │                                     │
 *  │ Map every barrier.                  │
 *  │ Free the city.  ← accent            │
 *  │                                     │
 *  │ Sub-copy with inline bold           │
 *  │                                     │
 *  │ ┌─────────────────────────────────┐ │
 *  │ │  HeroIllustration               │ │
 *  │ └─────────────────────────────────┘ │
 *  │                                     │
 *  │ 1  Spot a barrier          [icon]   │
 *  │ 2  AI suggests the tag     [icon]   │
 *  │ 3  City sees it            [icon]   │
 *  │                                     │
 *  │ [  Start mapping — it takes 30s  ] │
 *  │   Already have an account? Sign in  │
 *  └─────────────────────────────────────┘
 */

import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppHeader,
  Button,
  HeroIllustration,
  StepItem,
} from '@/components';
import {
  Colors,
  FontFamily,
  FontSize,
  Spacing
} from '@/constants';

// ─── Step data ────────────────────────────────────────────────────────────────

const STEPS = [
  {
    key: 'snap',
    number: 1,
    title: 'Spot a barrier',
    description: 'Missing ramp, broken curb, no audio crossing',
    icon: <Feather name="camera" size={18} color={Colors.textSecondary} />,
  },
  {
    key: 'ai',
    number: 2,
    title: 'AI suggests the tag',
    description: 'You confirm in one tap — no forms',
    icon: <MaterialCommunityIcons name="shimmer" size={18} color={Colors.textSecondary} />,
  },
  {
    key: 'city',
    number: 3,
    title: 'City sees it',
    description: 'Verified reports go on the public map',
    icon: <Ionicons name="shield-checkmark-outline" size={18} color={Colors.textSecondary} />,
  },
] as const;

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <LinearGradient
      colors={['#DDE8FF', '#FFFFFF']}
      locations={[0, 0.42]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* ── Header ───────────────────────────────────────────────────────── */}
          <AppHeader badge="BETA" style={styles.header} />

          {/* ── Headline ─────────────────────────────────────────────────────── */}
          <View style={styles.headlineBlock}>
            <Text style={styles.headlineLine1}>Map every barrier.</Text>
            <Text style={styles.headlineLine2}>Free the city.</Text>
          </View>

          {/* ── Sub-copy with inline bold ─────────────────────────────────────── */}
          <Text style={styles.subCopy}>
            A missing ramp can stop a wheelchair. A broken curb cut can stop a
            stroller.{' '}
            <Text style={styles.subCopyBold}>
              Snap it, tag it, and TwinCity's AI will verify it
            </Text>{' '}
            for everyone walking, rolling, or wheeling behind you.
          </Text>

          {/* ── Hero illustration ─────────────────────────────────────────────── */}
          <HeroIllustration style={styles.hero} />

          {/* ── Steps ────────────────────────────────────────────────────────── */}
          <View style={styles.steps}>
            {STEPS.map((step, i) => (
              <React.Fragment key={step.key}>
                <StepItem
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
                {/* Divider — skip after last item */}
                {i < STEPS.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>

          {/* ── CTA ──────────────────────────────────────────────────────────── */}
          <View style={styles.actions}>
            <Button
              label="Start mapping — it takes 30s"
              onPress={() => { router.replace('/(tabs)') }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── Root gradient container ────────────────────────────────────────
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: 'transparent', // let gradient show through
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing['5'],
    paddingTop: Spacing['4'],
    paddingBottom: Spacing['8'],
    gap: Spacing['4'],
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    marginBottom: Spacing['1'],
  },

  // ── Headline ──────────────────────────────────────────────────────────────
  headlineBlock: {
    gap: 0,
  },
  headlineLine1: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['3xl'],
    color: Colors.textPrimary,
    lineHeight: FontSize['3xl'] * 1.15,
  },
  headlineLine2: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['3xl'],
    color: Colors.primary,
    lineHeight: FontSize['3xl'] * 1.15,
  },

  // ── Sub-copy ─────────────────────────────────────────────────────────────
  subCopy: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: FontSize.md * 1.6,
  },
  subCopyBold: {
    fontFamily: FontFamily.bodyBold,
    color: Colors.textPrimary,
  },

  // ── Hero ─────────────────────────────────────────────────────────────────
  hero: {
    marginHorizontal: -Spacing['1'],
  },

  // ── Steps ─────────────────────────────────────────────────────────────────
  steps: {
    gap: 0,
    paddingVertical: Spacing['2'],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing['3'],
    marginLeft: 28 + Spacing['3'], // align with content, skip number badge
  },

  // ── Actions ───────────────────────────────────────────────────────────────
  actions: {
    gap: Spacing['3'],
    marginTop: Spacing['2'],
  },
  signInRow: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  signInLink: {
    fontFamily: FontFamily.bodySemiBold,
    color: Colors.primary,
  },
});
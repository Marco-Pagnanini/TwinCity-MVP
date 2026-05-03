import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily, FontSize, Palette, Radius, Shadow, Spacing } from '@/constants';

const { width: W, height: H } = Dimensions.get('window');

const CONFETTI_COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#ffffff', '#A78BFA'];

const PIPELINE = [
    { key: 'submitted', label: 'Submitted', sub: 'Just now', done: true, running: false },
    { key: 'ai', label: 'AI review', sub: 'Estimated 2 min', done: false, running: true },
    { key: 'community', label: 'Community', sub: 'After AI passes', done: false, running: false },
    { key: 'published', label: 'Published', sub: 'Visible on map', done: false, running: false },
];

function SpinningIcon() {
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withRepeat(withTiming(360, { duration: 1200 }), -1, false);
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }));

    return (
        <Animated.View style={style}>
            <Ionicons name="reload-outline" size={16} color={Palette.warn} />
        </Animated.View>
    );
}

export default function SubmittedScreen() {
    const insets = useSafeAreaInsets();
    const confettiRef = useRef<ConfettiCannon>(null);

    useEffect(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        const t = setTimeout(() => confettiRef.current?.start(), 300);
        return () => clearTimeout(t);
    }, []);

    return (
        <View style={styles.root}>
            {/* Confetti — rendered above everything */}
            <ConfettiCannon
                ref={confettiRef}
                count={130}
                origin={{ x: W / 2, y: H }}
                explosionSpeed={400}
                fallSpeed={3200}
                colors={CONFETTI_COLORS}
                fadeOut
                autoStart={false}
            />

            <ScrollView
                contentContainerStyle={[
                    styles.content,
                    { paddingTop: insets.top + Spacing['8'], paddingBottom: insets.bottom + 100 },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Checkmark */}
                <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={48} color={Colors.primary} />
                </View>

                <Text style={styles.title}>Report submitted!</Text>
                <Text style={styles.subtitle}>
                    Your report is in the queue.{'\n'}AI is double-checking the photo before publishing.
                </Text>

                {/* Validation pipeline */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>VALIDATION STATUS</Text>

                    {PIPELINE.map((step, i) => (
                        <View key={step.key}>
                            <View style={styles.pipelineRow}>
                                {/* Icon */}
                                <View style={[
                                    styles.pipelineIcon,
                                    step.done && styles.pipelineIconDone,
                                    step.running && styles.pipelineIconRunning,
                                ]}>
                                    {step.done && <Ionicons name="checkmark" size={14} color={Colors.primary} />}
                                    {step.running && <SpinningIcon />}
                                </View>

                                {/* Labels */}
                                <View style={styles.pipelineContent}>
                                    <Text style={[styles.pipelineLabel, !step.done && !step.running && styles.pipelineLabelMuted]}>
                                        {step.label}
                                    </Text>
                                    <Text style={styles.pipelineSub}>{step.sub}</Text>
                                </View>

                                {/* Running badge */}
                                {step.running && (
                                    <View style={styles.runningBadge}>
                                        <Text style={styles.runningText}>RUNNING</Text>
                                    </View>
                                )}
                            </View>

                            {/* Connector line */}
                            {i < PIPELINE.length - 1 && (
                                <View style={styles.connector} />
                            )}
                        </View>
                    ))}
                </View>

                {/* Points banner */}
                <View style={styles.pointsBanner}>
                    <Text style={styles.pointsEmoji}>🏅</Text>
                    <View>
                        <Text style={styles.pointsTitle}>+15 City points</Text>
                        <Text style={styles.pointsSub}>3 more reports to reach Scout level</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom actions */}
            <View style={[styles.actions, { paddingBottom: insets.bottom + Spacing['4'] }]}>
                <TouchableOpacity
                    style={styles.ghostBtn}
                    onPress={() => router.replace('/(tabs)' as any)}
                >
                    <Text style={styles.ghostBtnText}>View on map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => router.replace('/capture' as any)}
                >
                    <Text style={styles.primaryBtnText}>Report another</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: Spacing['5'],
        gap: Spacing['4'],
    },

    // Checkmark
    checkCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        borderWidth: 3,
        borderColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFF6FF',
        marginBottom: Spacing['2'],
    },
    title: {
        fontFamily: FontFamily.displayBold,
        fontSize: FontSize['3xl'],
        color: Colors.textPrimary,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.md,
        color: Colors.textSecondary,
        textAlign: 'center',
        lineHeight: FontSize.md * 1.6,
    },

    // Pipeline card
    card: {
        width: '100%',
        backgroundColor: Colors.surface,
        borderRadius: Radius.xl,
        padding: Spacing['4'],
        ...Shadow.sm,
    },
    cardTitle: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: 11,
        color: Colors.textSecondary,
        letterSpacing: 0.8,
        marginBottom: Spacing['3'],
    },
    pipelineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing['3'],
        minHeight: 40,
    },
    pipelineIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.surface,
    },
    pipelineIconDone: {
        borderColor: Colors.primary,
        backgroundColor: '#EFF6FF',
    },
    pipelineIconRunning: {
        borderColor: Palette.warn,
        backgroundColor: Palette.warnSurface,
    },
    pipelineContent: {
        flex: 1,
    },
    pipelineLabel: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.sm,
        color: Colors.textPrimary,
    },
    pipelineLabelMuted: {
        color: Colors.textSecondary,
    },
    pipelineSub: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        marginTop: 1,
    },
    runningBadge: {
        backgroundColor: Palette.warnSurface,
        paddingHorizontal: Spacing['2'],
        paddingVertical: 3,
        borderRadius: Radius.full,
    },
    runningText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: 10,
        color: Palette.warn,
        letterSpacing: 0.5,
    },
    connector: {
        width: 2,
        height: 16,
        backgroundColor: Colors.border,
        marginLeft: 13,
        marginVertical: 2,
    },

    // Points banner
    pointsBanner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing['3'],
        backgroundColor: '#FFFBEB',
        borderRadius: Radius.xl,
        padding: Spacing['4'],
        borderWidth: 1,
        borderColor: '#FDE68A',
    },
    pointsEmoji: {
        fontSize: 28,
    },
    pointsTitle: {
        fontFamily: FontFamily.bodyBold,
        fontSize: FontSize.md,
        color: '#92400E',
    },
    pointsSub: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.xs,
        color: '#B45309',
        marginTop: 2,
    },

    // Actions
    actions: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        gap: Spacing['3'],
        paddingHorizontal: Spacing['5'],
        paddingTop: Spacing['3'],
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    ghostBtn: {
        flex: 1,
        height: 52,
        borderRadius: Radius.xl,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ghostBtnText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.md,
        color: Colors.primary,
    },
    primaryBtn: {
        flex: 1,
        height: 52,
        borderRadius: Radius.xl,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadow.md,
    },
    primaryBtnText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.md,
        color: '#FFF',
    },
});

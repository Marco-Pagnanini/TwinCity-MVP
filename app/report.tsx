import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily, FontSize, Palette, Radius, Shadow, Spacing } from '@/constants';
import type { PresenceStatus } from '@/constants';

// ─── Types ────────────────────────────────────────────────────────────────────

type BarrierType = {
    id: string;
    label: string;
    description: string;
    icon: string;
};

// For now only Ramp — add more types as needed
const BARRIER_TYPES: BarrierType[] = [
    {
        id: 'ramp',
        label: 'Ramp',
        description: 'Curb without accessible ramp',
        icon: 'arrow-up-circle-outline',
    },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ReportScreen() {
    const insets = useSafeAreaInsets();
    const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

    const [selectedType, setSelectedType] = useState<BarrierType>(BARRIER_TYPES[0]);
    const [presence, setPresence] = useState<PresenceStatus>('missing');
    const [notes, setNotes] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const handleSubmit = () => {
        // TODO: send to API
        router.replace('/(tabs)' as any);
    };

    return (
        <KeyboardAvoidingView
            style={styles.root}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* ── Header ───────────────────────────────────────────────── */}
            <View style={[styles.header, { paddingTop: insets.top + Spacing['2'] }]}>
                <Pressable style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
                </Pressable>
                <Text style={styles.headerTitle}>New report</Text>
                <Text style={styles.step}>Step 2 of 3</Text>
            </View>

            <ScrollView
                contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* ── Photo ────────────────────────────────────────────── */}
                <View style={styles.photoWrap}>
                    {photoUri ? (
                        <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
                    ) : (
                        <View style={[styles.photo, styles.photoPlaceholder]}>
                            <Ionicons name="image-outline" size={36} color={Palette.gray400} />
                        </View>
                    )}
                    <View style={styles.photoChip}>
                        <MaterialCommunityIcons name="shimmer" size={12} color={Colors.primary} />
                        <Text style={styles.photoChipText}>AI analyzed in 1.2s</Text>
                    </View>
                    <View style={styles.coordsChip}>
                        <Text style={styles.coordsText}>45.0763° N, 7.6864° E</Text>
                    </View>
                </View>

                {/* ── AI Suggests ──────────────────────────────────────── */}
                <View style={styles.aiCard}>
                    <View style={styles.aiCardHeader}>
                        <View style={styles.aiLabel}>
                            <MaterialCommunityIcons name="shimmer" size={13} color={Colors.primary} />
                            <Text style={styles.aiLabelText}>AI SUGGESTS</Text>
                        </View>
                        <Text style={styles.aiConfidence}>92% confidence</Text>
                    </View>

                    {BARRIER_TYPES.map((bt) => (
                        <Pressable
                            key={bt.id}
                            style={[styles.typeRow, selectedType.id === bt.id && styles.typeRowSelected]}
                            onPress={() => setSelectedType(bt)}
                        >
                            <View style={styles.typeIconWrap}>
                                <Ionicons name={bt.icon as any} size={18} color={Colors.primary} />
                            </View>
                            <View style={styles.typeContent}>
                                <Text style={styles.typeLabel}>{bt.label} — missing</Text>
                                <Text style={styles.typeDesc}>{bt.description}</Text>
                            </View>
                            <Pressable
                                style={[styles.confirmCheck, confirmed && styles.confirmCheckActive]}
                                onPress={() => setConfirmed((v) => !v)}
                            >
                                {confirmed && <Ionicons name="checkmark" size={14} color={Colors.primary} />}
                            </Pressable>
                        </Pressable>
                    ))}
                </View>

                {/* ── Status ───────────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>STATUS</Text>
                    <View style={styles.toggleRow}>
                        <Pressable
                            style={[styles.toggleBtn, presence === 'missing' && styles.toggleMissingActive]}
                            onPress={() => setPresence('missing')}
                        >
                            <Ionicons
                                name="close"
                                size={16}
                                color={presence === 'missing' ? Palette.err : Colors.textSecondary}
                            />
                            <Text style={[
                                styles.toggleText,
                                presence === 'missing' && { color: Palette.err, fontFamily: FontFamily.bodyBold },
                            ]}>
                                Missing
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[styles.toggleBtn, presence === 'present' && styles.togglePresentActive]}
                            onPress={() => setPresence('present')}
                        >
                            <Ionicons
                                name="checkmark"
                                size={16}
                                color={presence === 'present' ? Palette.ok : Colors.textSecondary}
                            />
                            <Text style={[
                                styles.toggleText,
                                presence === 'present' && { color: Palette.ok, fontFamily: FontFamily.bodyBold },
                            ]}>
                                Present
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* ── Notes ────────────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>NOTES (OPTIONAL)</Text>
                    <TextInput
                        style={styles.notesInput}
                        placeholder="High curb, no ramp. Two steps to enter the pharmacy on the corner."
                        placeholderTextColor={Palette.gray400}
                        multiline
                        numberOfLines={4}
                        value={notes}
                        onChangeText={setNotes}
                        textAlignVertical="top"
                    />
                </View>
            </ScrollView>

            {/* ── Submit ───────────────────────────────────────────────── */}
            <View style={[styles.submitWrap, { paddingBottom: insets.bottom + Spacing['4'] }]}>
                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
                    <Text style={styles.submitText}>Submit for AI review</Text>
                    <Ionicons name="arrow-forward" size={18} color="#FFF" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing['5'],
        paddingBottom: Spacing['3'],
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backBtn: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing['2'],
    },
    headerTitle: {
        flex: 1,
        fontFamily: FontFamily.displayBold,
        fontSize: FontSize.lg,
        color: Colors.textPrimary,
    },
    step: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
    },

    content: {
        padding: Spacing['5'],
        gap: Spacing['4'],
    },

    // Photo
    photoWrap: {
        borderRadius: Radius.xl,
        overflow: 'hidden',
        height: 180,
    },
    photo: {
        width: '100%',
        height: '100%',
        backgroundColor: Palette.gray200,
    },
    photoPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoChip: {
        position: 'absolute',
        top: Spacing['3'],
        left: Spacing['3'],
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: Spacing['2'],
        paddingVertical: 4,
        borderRadius: Radius.full,
    },
    photoChipText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: 11,
        color: Colors.primary,
    },
    coordsChip: {
        position: 'absolute',
        bottom: Spacing['3'],
        right: Spacing['3'],
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: Spacing['2'],
        paddingVertical: 4,
        borderRadius: Radius.md,
    },
    coordsText: {
        fontFamily: FontFamily.mono,
        fontSize: 10,
        color: '#FFF',
    },

    // AI card
    aiCard: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.xl,
        borderWidth: 1.5,
        borderColor: Colors.primary,
        padding: Spacing['4'],
        gap: Spacing['3'],
    },
    aiCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    aiLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    aiLabelText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: 11,
        color: Colors.primary,
        letterSpacing: 0.5,
    },
    aiConfidence: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
    },
    typeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing['3'],
        paddingVertical: Spacing['1'],
    },
    typeRowSelected: {},
    typeIconWrap: {
        width: 32,
        height: 32,
        borderRadius: Radius.md,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeContent: {
        flex: 1,
    },
    typeLabel: {
        fontFamily: FontFamily.bodyBold,
        fontSize: FontSize.md,
        color: Colors.textPrimary,
    },
    typeDesc: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    confirmCheck: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmCheckActive: {
        borderColor: Colors.primary,
        backgroundColor: '#EFF6FF',
    },

    // Section
    section: {
        gap: Spacing['2'],
    },
    sectionLabel: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: 11,
        color: Colors.textSecondary,
        letterSpacing: 0.8,
    },

    // Toggle
    toggleRow: {
        flexDirection: 'row',
        gap: Spacing['3'],
    },
    toggleBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing['2'],
        height: 52,
        borderRadius: Radius.lg,
        backgroundColor: Colors.surface,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    toggleMissingActive: {
        backgroundColor: Palette.errSurface,
        borderColor: Palette.err,
    },
    togglePresentActive: {
        backgroundColor: Palette.okSurface,
        borderColor: Palette.ok,
    },
    toggleText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.md,
        color: Colors.textSecondary,
    },

    // Notes
    notesInput: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Spacing['4'],
        fontFamily: FontFamily.body,
        fontSize: FontSize.md,
        color: Colors.textPrimary,
        minHeight: 100,
    },

    // Submit
    submitWrap: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Spacing['5'],
        paddingTop: Spacing['3'],
        backgroundColor: Colors.surface,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        ...Shadow.md,
    },
    submitBtn: {
        height: 54,
        borderRadius: Radius.xl,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing['2'],
        ...Shadow.md,
    },
    submitText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.md,
        color: '#FFF',
    },
});

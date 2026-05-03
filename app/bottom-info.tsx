import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { Colors, FontFamily, FontSize, Palette, PresenceState, Radius, Spacing, ValidationState } from '@/constants';
import { MOCK_REPORTS } from '@/data/mock_reports';

export default function BottomInfo() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const report = MOCK_REPORTS.find((r) => r.id === id);

    if (!report) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>Report not found.</Text>
            </View>
        );
    }

    const vToken = ValidationState[report.status];
    const pToken = PresenceState[report.presence];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Photo placeholder */}
            <View style={styles.photo}>
                <Ionicons name="image-outline" size={40} color={Palette.gray400} />
                <Text style={styles.photoLabel}>No photo yet</Text>
            </View>

            {/* Type + address */}
            <View style={styles.titleRow}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.type}>{report.type}</Text>
                    <View style={styles.addressRow}>
                        <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
                        <Text style={styles.address}>{report.address}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{report.time}</Text>
            </View>

            {/* Badges */}
            <View style={styles.badgesRow}>
                <View style={[styles.badge, { backgroundColor: vToken.surface, borderColor: vToken.border }]}>
                    <Text style={[styles.badgeText, { color: vToken.color }]}>{vToken.label}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: pToken.surface, borderColor: pToken.border }]}>
                    <Text style={[styles.badgeText, { color: pToken.color }]}>{pToken.label}</Text>
                </View>
            </View>

            {/* Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Details</Text>

                <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="map-marker-outline" size={18} color={Colors.textSecondary} />
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>Coordinates</Text>
                        <Text style={styles.detailValue}>
                            {report.lat.toFixed(5)} N, {report.lng.toFixed(5)} E
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <Ionicons name="shield-checkmark-outline" size={18} color={Colors.textSecondary} />
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>AI validation</Text>
                        <Text style={styles.detailValue}>92% confidence · {vToken.label}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <Ionicons name="people-outline" size={18} color={Colors.textSecondary} />
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>Community</Text>
                        <Text style={styles.detailValue}>3 verifications nearby</Text>
                    </View>
                </View>
            </View>

            {/* Close */}
            <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
                <Text style={styles.btnText}>Close</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.surface,
    },
    content: {
        padding: Spacing['5'],
        gap: Spacing['4'],
    },
    empty: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.md,
        color: Colors.textSecondary,
    },
    photo: {
        height: 160,
        backgroundColor: Palette.gray100,
        borderRadius: Radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing['2'],
    },
    photoLabel: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.sm,
        color: Palette.gray400,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    type: {
        fontFamily: FontFamily.displayBold,
        fontSize: FontSize.xl,
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    address: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.sm,
        color: Colors.textSecondary,
    },
    time: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    badgesRow: {
        flexDirection: 'row',
        gap: Spacing['2'],
        flexWrap: 'wrap',
    },
    badge: {
        paddingHorizontal: Spacing['3'],
        paddingVertical: Spacing['1'],
        borderRadius: Radius.full,
        borderWidth: 1,
    },
    badgeText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.sm,
    },
    section: {
        backgroundColor: Colors.background,
        borderRadius: Radius.xl,
        padding: Spacing['4'],
    },
    sectionTitle: {
        fontFamily: FontFamily.bodyBold,
        fontSize: FontSize.md,
        color: Colors.textPrimary,
        marginBottom: Spacing['3'],
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing['3'],
        paddingVertical: Spacing['2'],
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.sm,
        color: Colors.textPrimary,
    },
    detailValue: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.xs,
        color: Colors.textSecondary,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginLeft: 18 + Spacing['3'],
    },
    btn: {
        height: 52,
        borderRadius: Radius.xl,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.md,
        color: '#FFF',
    },
});

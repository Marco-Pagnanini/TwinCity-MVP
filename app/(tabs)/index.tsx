import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily, FontSize, Palette, Radius, Shadow, Spacing } from '@/constants';
import { MOCK_REPORTS } from '@/data/mock_reports';

const PIN_COLORS: Record<string, string> = {
    validated: Colors.validated,
    inReview: Palette.warnLight,
    missing: Colors.missing,
    present: Colors.present,
};

const TORINO_REGION = {
    latitude: 45.0703,
    longitude: 7.6869,
    latitudeDelta: 0.018,
    longitudeDelta: 0.018,
};

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const [_location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [search] = useState<string>('Centro · Torino');

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;
            const loc = await Location.getCurrentPositionAsync({});
            setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_DEFAULT}
                initialRegion={TORINO_REGION}
                showsUserLocation
                showsMyLocationButton={false}
            >
                {MOCK_REPORTS.map((r) => (
                    <Marker
                        key={r.id}
                        coordinate={{ latitude: r.lat, longitude: r.lng }}
                        pinColor={r.status === 'inReview' ? Palette.warnLight : PIN_COLORS[r.presence]}
                        onPress={() => router.push({ pathname: '/bottom-info', params: { id: r.id } })}
                    />
                ))}
            </MapView>

            {/* Search bar */}
            <View style={[styles.searchBar, { top: insets.top + Spacing['3'] }]}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>M</Text>
                </View>
                <Text style={styles.locationText}>{search}</Text>
                <TouchableOpacity style={styles.searchIcon}>
                    <Ionicons name="search" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E7EB',
    },
    searchBar: {
        position: 'absolute',
        left: Spacing['4'],
        right: Spacing['4'],
        height: 48,
        backgroundColor: Colors.surface,
        borderRadius: Radius['2xl'],
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing['3'],
        gap: Spacing['2'],
        ...Shadow.md,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.sm,
        color: '#FFF',
    },
    locationText: {
        flex: 1,
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.md,
        color: Colors.textPrimary,
    },
    searchIcon: {
        padding: Spacing['1'],
    },
});

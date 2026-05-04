import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

import { FontFamily, FontSize, Palette, Radius } from '@/constants';
import type { ImagePoint } from '@/data/mock_reports';

export interface ReportImagePreviewProps {
    image: ImageSourcePropType;
    point: ImagePoint[];
    height?: number;
    clusterThreshold?: number; // distanza minima tra punti (0-1, default 0.05)
}

interface Cluster {
    x: number;
    y: number;
    count: number;
}

function clusterPoints(points: ImagePoint[], threshold: number): Cluster[] {
    const clusters: Cluster[] = [];

    for (const p of points) {
        const existing = clusters.find(
            (c) => Math.hypot(c.x - p.x, c.y - p.y) < threshold
        );
        if (existing) {
            // aggiorna centroide del cluster
            existing.x = (existing.x * existing.count + p.x) / (existing.count + 1);
            existing.y = (existing.y * existing.count + p.y) / (existing.count + 1);
            existing.count += 1;
        } else {
            clusters.push({ x: p.x, y: p.y, count: 1 });
        }
    }

    return clusters;
}

export default function ReportImagePreview({
    image,
    point,
    height = 200,
    clusterThreshold = 0.05,
}: ReportImagePreviewProps) {
    const clusters = clusterPoints(point, clusterThreshold);

    return (
        <View style={[styles.container, { height }]}>
            <Image source={image} style={styles.image} resizeMode="contain" />
            {clusters.map((c, i) => (
                <View
                    key={i}
                    style={[styles.marker, { left: `${c.x * 100}%` as any, top: `${c.y * 100}%` as any }]}
                >
                    {c.count > 1 ? (
                        <View style={styles.cluster}>
                            <Text style={styles.clusterText}>{c.count}</Text>
                        </View>
                    ) : (
                        <View style={styles.dot} />
                    )}
                </View>
            ))}
        </View>
    );
}

const DOT = 12;
const CLUSTER = 22;

const styles = StyleSheet.create({
    container: {
        borderRadius: Radius.xl,
        overflow: 'hidden',
        backgroundColor: Palette.gray100,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    marker: {
        position: 'absolute',
        transform: [{ translateX: -(CLUSTER / 2) }, { translateY: -(CLUSTER / 2) }],
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: DOT,
        height: DOT,
        borderRadius: DOT / 2,
        backgroundColor: Palette.accentLight,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    cluster: {
        width: CLUSTER,
        height: CLUSTER,
        borderRadius: CLUSTER / 2,
        backgroundColor: Palette.accentLight,
        borderWidth: 2,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    clusterText: {
        fontFamily: FontFamily.bodySemiBold,
        fontSize: FontSize.xs,
        color: '#fff',
    },
});

import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/constants';

export default function CaptureScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [photo, setPhoto] = useState<string | null>(null);
  const [shooting, setShooting] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  // ── Permission not yet determined ───────────────────────────────────────────
  if (!permission) {
    return <View style={styles.container} />;
  }

  // ── Permission denied ───────────────────────────────────────────────────────
  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Ionicons name="camera-outline" size={48} color="rgba(255,255,255,0.4)" />
        <Text style={styles.permTitle}>Camera access needed</Text>
        <Text style={styles.permSub}>Allow TwinCity to use your camera to report barriers.</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Allow camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Photo preview ───────────────────────────────────────────────────────────
  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={StyleSheet.absoluteFill} resizeMode="cover" />

        {/* Dark overlay at top */}
        <View style={[styles.topBar, { paddingTop: insets.top + Spacing['2'] }]}>
          <Pressable style={styles.iconBtn} onPress={() => setPhoto(null)}>
            <Ionicons name="close" size={24} color="#FFF" />
          </Pressable>
          <Text style={styles.topLabel}>Preview</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Actions */}
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing['4'] }]}>
          <TouchableOpacity style={styles.retakeBtn} onPress={() => setPhoto(null)}>
            <Text style={styles.retakeBtnText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.useBtn}
            onPress={() => {
              router.replace({ pathname: '/report' as any, params: { photoUri: photo } });
            }}
          >
            <Text style={styles.useBtnText}>Use photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Camera viewfinder ───────────────────────────────────────────────────────
  const takePicture = async () => {
    if (!cameraRef.current || shooting) return;
    setShooting(true);
    try {
      const result = await cameraRef.current.takePictureAsync({ quality: 0.85 });
      if (result?.uri) setPhoto(result.uri);
    } finally {
      setShooting(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing} />

      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + Spacing['2'] }]}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.topLabel}>Report a barrier</Text>
        <Pressable
          style={styles.iconBtn}
          onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
        >
          <Ionicons name="camera-reverse-outline" size={24} color="#FFF" />
        </Pressable>
      </View>

      {/* Viewfinder frame */}
      <View style={styles.frame} pointerEvents="none">
        <View style={[styles.corner, styles.tl]} />
        <View style={[styles.corner, styles.tr]} />
        <View style={[styles.corner, styles.bl]} />
        <View style={[styles.corner, styles.br]} />
      </View>

      {/* Hint */}
      <View style={styles.hintWrap}>
        <Text style={styles.hint}>Frame the barrier clearly</Text>
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + Spacing['4'] }]}>
        {/* Flash placeholder */}
        <View style={{ width: 44 }} />

        {/* Shutter */}
        <Pressable onPress={takePicture} style={styles.shutter} disabled={shooting}>
          {shooting
            ? <ActivityIndicator color={Colors.primary} />
            : <View style={styles.shutterDot} />}
        </Pressable>

        {/* Flip */}
        <Pressable
          style={styles.iconBtn}
          onPress={() => setFacing((f) => (f === 'back' ? 'front' : 'back'))}
        >
          <Ionicons name="sync-outline" size={22} color="#FFF" />
        </Pressable>
      </View>
    </View>
  );
}

const CORNER = 24;
const BORDER = 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['6'],
    gap: Spacing['3'],
  },

  // Permission screen
  permTitle: {
    fontFamily: FontFamily.bodyBold,
    fontSize: FontSize.lg,
    color: '#FFF',
    textAlign: 'center',
  },
  permSub: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  permBtn: {
    marginTop: Spacing['2'],
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing['6'],
    paddingVertical: Spacing['3'],
    borderRadius: Radius.xl,
  },
  permBtnText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: '#FFF',
  },

  // Top bar
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['4'],
    paddingBottom: Spacing['3'],
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  topLabel: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: '#FFF',
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Viewfinder corners
  frame: {
    position: 'absolute',
    top: '25%',
    left: '8%',
    right: '8%',
    bottom: '25%',
  },
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    borderColor: '#FFF',
  },
  tl: { top: 0, left: 0, borderTopWidth: BORDER, borderLeftWidth: BORDER },
  tr: { top: 0, right: 0, borderTopWidth: BORDER, borderRightWidth: BORDER },
  bl: { bottom: 0, left: 0, borderBottomWidth: BORDER, borderLeftWidth: BORDER },
  br: { bottom: 0, right: 0, borderBottomWidth: BORDER, borderRightWidth: BORDER },

  // Hint
  hintWrap: {
    position: 'absolute',
    bottom: '28%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hint: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: Spacing['3'],
    paddingVertical: Spacing['1'],
    borderRadius: Radius.full,
  },

  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['8'],
    paddingTop: Spacing['4'],
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  shutter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterDot: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
  },

  // Preview actions
  retakeBtn: {
    flex: 1,
    height: 52,
    borderRadius: Radius.xl,
    borderWidth: 1.5,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing['3'],
  },
  retakeBtnText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: '#FFF',
  },
  useBtn: {
    flex: 1,
    height: 52,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  useBtnText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: '#FFF',
  },
});

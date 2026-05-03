import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, FontFamily, FontSize, Radius, Shadow, Spacing } from '@/constants';

const { height } = Dimensions.get('window');
const VIDEO_SOURCE = require('../assets/video/appvideoback2.mp4');
const LOGO_SOURCE = require('../assets/images/logo.png');

export default function SplashScreen() {
  const player = useVideoPlayer(VIDEO_SOURCE, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Dark overlay for readability */}
      <View style={styles.overlay} />

      <View style={[styles.content, { paddingTop: insets.top + Spacing['4'], paddingBottom: insets.bottom + Spacing['8'] }]}>
        <View style={styles.brand}>
          <Image source={LOGO_SOURCE} style={styles.logo} resizeMode="contain" tintColor="#FFFFFF" />
          <Text style={styles.brandName}>TwinCity</Text>
        </View>

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.85}
          onPress={() => router.replace('/onboarding')}
        >
          <Text style={styles.btnText}>Inizia a mappare la città</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['5'],
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing['2'],
  },
  logo: {
    width: 36,
    height: 36,
  },
  brandName: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['2xl'],
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  btn: {
    width: '100%',
    height: 56,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  btnText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

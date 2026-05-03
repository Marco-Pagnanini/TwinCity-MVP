import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Shadow } from '@/constants';

const BAR_HEIGHT = 64;
const FAB_SIZE = 60;
const FAB_PROTRUDE = 22; // how many px the FAB sticks above the bar

function FloatingTabBar({ state, descriptors, navigation }: any) {
  const insets = useSafeAreaInsets();

  const tabs = state.routes.filter((r: any) => r.name !== 'capture-tab');

  const renderTab = (route: any, index: number) => {
    const realIndex = state.routes.indexOf(route);
    const isFocused = state.index === realIndex;

    const iconMap: Record<string, [string, string]> = {
      index: ['home', 'home-outline'],
      reports: ['list', 'list-outline'],
    };
    const [activeIcon, inactiveIcon] = iconMap[route.name] ?? ['ellipse', 'ellipse-outline'];

    const onPress = () => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
    };

    return (
      <Pressable
        key={route.key}
        onPress={onPress}
        style={styles.tabItem}
        accessibilityRole="button"
        accessibilityState={{ selected: isFocused }}
      >
        <Ionicons
          name={(isFocused ? activeIcon : inactiveIcon) as any}
          size={22}
          color={isFocused ? Colors.primary : Colors.textSecondary}
        />
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.wrapper,
        { bottom: insets.bottom + 16 },
      ]}
    >
      {/* Pill bar */}
      <View style={styles.pill}>
        {renderTab(tabs[0], 0)}
        {/* spacer for FAB slot */}
        <View style={styles.fabSlot} />
        {renderTab(tabs[1], 1)}
      </View>

      {/* FAB — floats above the pill */}
      <Pressable
        onPress={() => router.push('/capture' as any)}
        style={({ pressed }) => [styles.fabWrap, pressed && { opacity: 0.85 }]}
        accessibilityRole="button"
        accessibilityLabel="Segnala un problema"
      >
        <View style={styles.fabInner}>
          <Ionicons name="camera" size={26} color="#FFF" />
        </View>
      </Pressable>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <FloatingTabBar {...props} />}>
      <Tabs.Screen name="index" options={{ headerShown: false, title: 'Home' }} />
      <Tabs.Screen name="capture-tab" options={{ headerShown: false, title: '' }} />
      <Tabs.Screen name="reports" options={{ headerShown: false, title: 'Reports' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: BAR_HEIGHT + FAB_PROTRUDE,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pill: {
    width: '100%',
    height: BAR_HEIGHT,
    backgroundColor: '#FFF',
    borderRadius: BAR_HEIGHT / 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    ...Shadow.xl,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: '100%',
  },
  fabSlot: {
    width: FAB_SIZE + 8,
  },
  fabWrap: {
    position: 'absolute',
    top: 0,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
  },
  fabInner: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.lg,
  },
});

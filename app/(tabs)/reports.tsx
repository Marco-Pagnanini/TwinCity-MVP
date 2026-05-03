import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader, Badge } from '@/components';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/constants';
import { MOCK_REPORTS } from '@/data/mock_reports';

const STATUS_LABELS: Record<string, string> = {
  validated: 'Validated',
  inReview: 'In review',
  missing: 'Missing',
  present: 'Present',
};

export default function ReportsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <AppHeader />
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={MOCK_REPORTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 80 }]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <View style={styles.iconWrap}>
              <Ionicons
                name={item.icon as any}
                size={20}
                color={Colors.textSecondary}
              />
            </View>
            <View style={styles.rowContent}>
              <Text style={styles.rowType}>{item.type}</Text>
              <Text style={styles.rowAddress}>{item.address}</Text>
              <Text style={styles.rowTime}>{item.time}</Text>
            </View>
            <Badge label={STATUS_LABELS[item.status]} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing['5'],
    paddingVertical: Spacing['4'],
  },
  list: {
    paddingTop: Spacing['2'],
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 56 + Spacing['5'],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing['4'],
    paddingHorizontal: Spacing['5'],
    gap: Spacing['3'],
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  rowType: {
    fontFamily: FontFamily.bodyBold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  rowAddress: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  rowTime: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function EmptyState({ onAddPress }) {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Welcome to Your Journal</Text>
      <Text style={styles.emptyText}>
        Tap the + button to add your first entry
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray,
    marginBottom: 10,
  },
  emptyText: {
    ...FONTS.body,
    textAlign: 'center',
  },
});
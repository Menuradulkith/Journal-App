// src/components/dashboard/FrequencyStats.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function FrequencyStats({ entries, stats }) {
  return (
    <View style={styles.frequencyContainer}>
      <View style={styles.frequencyItem}>
        <Text style={styles.frequencyValue}>{Object.keys(entries).length}</Text>
        <Text style={styles.frequencyLabel}>Total Days</Text>
      </View>
      <View style={styles.frequencyItem}>
        <Text style={styles.frequencyValue}>{stats.totalEntries}</Text>
        <Text style={styles.frequencyLabel}>Total Entries</Text>
      </View>
      <View style={styles.frequencyItem}>
        <Text style={styles.frequencyValue}>{stats.averageEntriesPerDay.toFixed(1)}</Text>
        <Text style={styles.frequencyLabel}>Avg. per Day</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frequencyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  frequencyItem: {
    alignItems: 'center',
  },
  frequencyValue: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  frequencyLabel: {
    ...FONTS.body,
  },
});
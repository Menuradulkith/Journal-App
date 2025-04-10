import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function ConsistencyBar({ entries }) {
  const daysJournaled = Object.keys(entries).length;
  const percentage = (daysJournaled / 30) * 100;

  return (
    <View style={styles.consistencyContainer}>
      <View style={styles.consistencyBar}>
        <View style={[styles.consistencyFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.consistencyText}>
        {daysJournaled} days journaled out of last 30 days
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  consistencyContainer: {
    marginVertical: 10,
  },
  consistencyBar: {
    height: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  consistencyFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  consistencyText: {
    ...FONTS.body,
    textAlign: 'center',
  },
});
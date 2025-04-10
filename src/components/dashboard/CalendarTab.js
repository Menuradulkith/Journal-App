import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import CalendarStreak from './CalendarStreak';
import ConsistencyBar from './ConsistencyBar';
import FrequencyStats from './FrequencyStats';
import { COLORS, SIZES, FONTS, SHADOW } from '../../constants/theme';

export default function CalendarTab({ entries, stats }) {
  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>This Month's Journal Activity</Text>
        <View style={styles.card}>
          <CalendarStreak entries={entries} />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Daily Journal Consistency</Text>
        <View style={styles.card}>
          <ConsistencyBar entries={entries} />
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Entry Frequency</Text>
        <View style={styles.card}>
          <FrequencyStats entries={entries} stats={stats} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    padding: SIZES.padding,
  },
  sectionContainer: {
    marginBottom: SIZES.margin,
  },
  sectionTitle: {
    ...FONTS.h2,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    ...SHADOW,
  },
});
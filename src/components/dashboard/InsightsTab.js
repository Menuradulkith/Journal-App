import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import StatCard from './StatCard';
import BarChart from './BarChart';
import { COLORS, SIZES, FONTS, SHADOW } from '../../constants/theme';

export default function InsightsTab({ stats, moodData, timeData, moodEmojis, moodColors }) {
  return (
    <ScrollView style={styles.tabContent}>
      <View style={styles.statsRow}>
        <StatCard label="Total Entries" value={stats.totalEntries} />
        <StatCard label="Day Streak" value={stats.streakDays} />
      </View>
      <View style={styles.statsRow}>
        <StatCard
          label="Most Common Mood"
          value={
            stats.mostCommonMood.mood
              ? `${moodEmojis[stats.mostCommonMood.mood] || ''} ${stats.mostCommonMood.mood}`
              : 'N/A'
          }
        />
        <StatCard label="Entries/Day" value={stats.averageEntriesPerDay.toFixed(1)} />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Mood Distribution</Text>
        <View style={styles.card}>
          {moodData.length > 0 ? (
            <BarChart
              data={moodData}
              maxValue={Math.max(...moodData.map((item) => item.value))}
              colorMap={moodColors}
            />
          ) : (
            <Text style={styles.emptyText}>No mood data available</Text>
          )}
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Time of Day</Text>
        <View style={styles.card}>
          {timeData.some((item) => item.value > 0) ? (
            <BarChart
              data={timeData}
              maxValue={Math.max(...timeData.map((item) => item.value))}
              colorMap={{
                Morning: COLORS.morning,
                Afternoon: COLORS.afternoon,
                Evening: COLORS.evening,
                Night: COLORS.night,
              }}
            />
          ) : (
            <Text style={styles.emptyText}>No time data available</Text>
          )}
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.margin,
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
  emptyText: {
    ...FONTS.body,
    textAlign: 'center',
    padding: 20,
  },
});
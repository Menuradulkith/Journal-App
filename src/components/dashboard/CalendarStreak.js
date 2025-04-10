import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function CalendarStreak({ entries }) {
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const entryDates = new Set(Object.keys(entries));
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.weekdayHeader}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={index} style={styles.weekdayText}>{day}</Text>
        ))}
      </View>
      <View style={styles.daysContainer}>
        {emptyDays.map((_, index) => (
          <View key={`empty-${index}`} style={styles.dayBox} />
        ))}
        {days.map((day) => {
          const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            .toISOString()
            .split('T')[0];
          const hasEntry = entryDates.has(dateStr);
          return (
            <View
              key={day}
              style={[styles.dayBox, hasEntry && styles.dayWithEntry]}
            >
              <Text style={[styles.dayText, hasEntry && styles.dayWithEntryText]}>
                {day}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    marginVertical: 10,
  },
  weekdayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekdayText: {
    ...FONTS.body,
    fontWeight: '500',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayBox: {
    width: Dimensions.get('window').width / 7 - 10,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
  },
  dayWithEntry: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  dayWithEntryText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
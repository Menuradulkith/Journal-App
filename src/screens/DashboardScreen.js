// src/screens/DashboardScreen.js
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import TabBar from '../components/dashboard/TabBar';
import InsightsTab from '../components/dashboard/InsightsTab';
import CalendarTab from '../components/dashboard/CalendarTab';
import { COLORS } from '../constants/theme';
import { MOODS } from '../constants/moods';

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('insights');
  const [moodData, setMoodData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const [stats, setStats] = useState({
    totalEntries: 0,
    streakDays: 0,
    mostCommonMood: { mood: '', count: 0 },
    averageEntriesPerDay: 0,
  });

  const entries = useSelector((state) => state.journal?.entries || {});

  const moodEmojis = MOODS.reduce((acc, mood) => ({
    ...acc,
    [mood.name]: mood.emoji,
  }), {});

  const moodColors = MOODS.reduce((acc, mood) => ({
    ...acc,
    [mood.name]: mood.color,
  }), {});

  useEffect(() => {
    const moodCount = {};
    const timeOfDayCount = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 };
    let totalEntries = 0;

    Object.entries(entries).forEach(([date, dayEntries]) => {
      if (Array.isArray(dayEntries)) {
        dayEntries.forEach((entry) => {
          if (entry.mood) {
            moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
          }

          const entryTime = entry.timestamp ? new Date(entry.timestamp) : new Date();
          const hour = entryTime.getHours();

          if (hour >= 5 && hour < 12) timeOfDayCount['Morning']++;
          else if (hour >= 12 && hour < 17) timeOfDayCount['Afternoon']++;
          else if (hour >= 17 && hour < 21) timeOfDayCount['Evening']++;
          else timeOfDayCount['Night']++;

          totalEntries++;
        });
      }
    });

    const dateStrings = Object.keys(entries).sort();
    let streakDays = 0;
    let currentStreak = 0;

    if (dateStrings.length > 0) {
      let prevDate = new Date(dateStrings[0]);
      currentStreak = 1;

      for (let i = 1; i < dateStrings.length; i++) {
        const currentDate = new Date(dateStrings[i]);
        const diffDays = (currentDate - prevDate) / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          currentStreak++;
        } else {
          if (currentStreak > streakDays) streakDays = currentStreak;
          currentStreak = 1;
        }
        prevDate = currentDate;
      }

      if (currentStreak > streakDays) streakDays = currentStreak;
    }

    let mostCommonMood = { mood: '', count: 0 };
    Object.entries(moodCount).forEach(([mood, count]) => {
      if (count > mostCommonMood.count) {
        mostCommonMood = { mood, count };
      }
    });

    const averageEntriesPerDay = totalEntries / (Object.keys(entries).length || 1);

    setMoodData(
      Object.entries(moodCount).map(([mood, count]) => ({
        label: mood,
        value: count,
        emoji: moodEmojis[mood] || '😐',
      }))
    );

    setTimeData([
      { label: 'Morning', value: timeOfDayCount['Morning'], emoji: '🌅' },
      { label: 'Afternoon', value: timeOfDayCount['Afternoon'], emoji: '☀️' },
      { label: 'Evening', value: timeOfDayCount['Evening'], emoji: '🌆' },
      { label: 'Night', value: timeOfDayCount['Night'], emoji: '🌙' },
    ]);

    setStats({
      totalEntries,
      streakDays,
      mostCommonMood,
      averageEntriesPerDay,
    });
  }, [entries]);

  return (
    <SafeAreaView style={styles.container}>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'insights' ? (
        <InsightsTab
          stats={stats}
          moodData={moodData}
          timeData={timeData}
          moodEmojis={moodEmojis}
          moodColors={moodColors}
        />
      ) : (
        <CalendarTab entries={entries} stats={stats} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
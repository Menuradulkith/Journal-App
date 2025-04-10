import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { MOODS } from '../../constants/moods';

export default function MoodSelector({ selectedMood, onSelectMood }) {
  return (
    <View style={styles.moodSelectionContainer}>
      {MOODS.map((mood) => (
        <TouchableOpacity
          key={mood.name}
          style={[
            styles.moodOption,
            selectedMood.name === mood.name && styles.selectedMoodOption,
          ]}
          onPress={() => onSelectMood(mood)}
        >
          <Text style={styles.moodEmoji}>{mood.emoji}</Text>
          <Text
            style={[
              styles.moodOptionText,
              selectedMood.name === mood.name && styles.selectedMoodOptionText,
            ]}
          >
            {mood.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  moodSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.margin,
  },
  moodOption: {
    width: '18%',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedMoodOption: {
    backgroundColor: COLORS.secondary,
  },
  moodEmoji: {
    fontSize: SIZES.fontLarge,
  },
  moodOptionText: {
    ...FONTS.small,
    marginTop: 5,
  },
  selectedMoodOptionText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});
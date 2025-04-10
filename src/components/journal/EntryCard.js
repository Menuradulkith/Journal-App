import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS, SHADOW } from '../../constants/theme';
import { MOODS } from '../../constants/moods';
import { formatTime } from '../../utils/dateUtils';

export default function EntryCard({ entry, onDelete }) {
  const getMoodEmoji = (moodName) => {
    const mood = MOODS.find((m) => m.name === moodName);
    return mood ? mood.emoji : '😐';
  };

  return (
    <View style={styles.entry}>
      <View style={styles.entryHeader}>
        <View style={styles.entryMeta}>
          <Text style={styles.entryDate}>
            {formatTime(entry.timestamp || entry.date)}
          </Text>
          <View style={styles.moodContainer}>
            <Text style={styles.moodEmoji}>
              {entry.moodEmoji || getMoodEmoji(entry.mood)}
            </Text>
            <Text style={styles.moodText}>{entry.mood}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(entry.date, entry.id)}
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.entryText}>{entry.content}</Text>

      {entry.imageUri && (
        <Image source={{ uri: entry.imageUri }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  entry: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginVertical: 6,
    ...SHADOW,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDate: {
    ...FONTS.body,
    marginRight: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: SIZES.radius,
  },
  moodEmoji: {
    fontSize: SIZES.fontMedium,
    marginRight: 4,
  },
  moodText: {
    fontSize: SIZES.fontTiny,
    color: COLORS.primary,
  },
  entryText: {
    fontSize: SIZES.fontMedium,
    color: COLORS.dark,
    lineHeight: 22,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 20,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
});
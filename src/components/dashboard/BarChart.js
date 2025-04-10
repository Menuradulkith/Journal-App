import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function BarChart({ data, maxValue, colorMap }) {
  return (
    <View style={styles.chartContainer}>
      {data.map((item) => (
        <View key={item.label} style={styles.barContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.barLabel}>
              {item.emoji} {item.label}
            </Text>
          </View>
          <View style={styles.barWrapper}>
            <View
              style={[
                styles.bar,
                {
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: colorMap[item.label] || COLORS.primary,
                },
              ]}
            />
            <Text style={styles.barValue}>{item.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 5,
  },
  barContainer: {
    marginBottom: 12,
  },
  labelContainer: {
    marginBottom: 4,
  },
  barLabel: {
    ...FONTS.body,
    color: COLORS.gray,
  },
  barWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 25,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
  },
  barValue: {
    position: 'absolute',
    right: 10,
    fontSize: SIZES.fontTiny,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
});
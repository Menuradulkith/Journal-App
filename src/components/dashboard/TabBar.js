import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOW } from '../../constants/theme';

export default function TabBar({ activeTab, setActiveTab }) {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'insights' && styles.activeTab]}
        onPress={() => setActiveTab('insights')}
      >
        <Text style={[styles.tabText, activeTab === 'insights' && styles.activeTabText]}>
          Insights
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'calendar' && styles.activeTab]}
        onPress={() => setActiveTab('calendar')}
      >
        <Text style={[styles.tabText, activeTab === 'calendar' && styles.activeTabText]}>
          Calendar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: SIZES.margin,
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.secondary,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: SIZES.radius - 2,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    ...SHADOW,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
});
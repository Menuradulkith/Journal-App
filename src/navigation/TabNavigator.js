import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JournalListScreen from '../screens/JournalListScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

const TabLabel = ({ label, focused }) => (
  <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
    {label}
  </Text>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#Ffc000',
        tabBarInactiveTintColor: '#9EA6C9',
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Journal"
        component={JournalListScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
             <MaterialCommunityIcons name="notebook" color={color} size={size} />
            </View>
          ),
          tabBarLabel: ({ focused }) => <TabLabel label="Journal" focused={focused} />,
          headerTitle: "My Journal",
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
              <MaterialCommunityIcons name="chart-box" color={color} size={size} />
            </View>
          ),
          tabBarLabel: ({ focused }) => <TabLabel label="Dashboard" focused={focused} />,
          headerTitle: "Journal Insights",
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F2FF',
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconContainer: { padding: 5, borderRadius: 5 },
  iconContainerFocused: { backgroundColor: '#EDF0FF' },
  tabLabel: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  tabLabelFocused: { fontWeight: 'bold' },
  header: {
    backgroundColor: '#Ffc000',
    elevation: 0,
    shadowOpacity: 0,
    height: 100,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

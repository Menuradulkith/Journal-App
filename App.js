import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/redux/store';
import TabNavigator from './src/navigation/TabNavigator';
import { loadEntries } from './src/utils/storage';
import { addEntry } from './src/redux/journalSlice';

function MainApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const loadedEntries = await loadEntries();
        const validEntries = loadedEntries && typeof loadedEntries === 'object' ? loadedEntries : {};
        Object.entries(validEntries).forEach(([date, entryList]) => {
          if (Array.isArray(entryList)) {
            entryList.forEach((entry) => store.dispatch(addEntry({ date, entry })));
          }
        });
      } catch (error) {
        console.error('Failed to load entries:', error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    initializeApp();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFAA1D',
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveEntries = async (entries) => {
  try {
    await AsyncStorage.setItem('journalEntries', JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save entries', e);
  }
};

export const loadEntries = async () => {
  try {
    const entries = await AsyncStorage.getItem('journalEntries');
    if (entries === null) return {};
    const parsed = JSON.parse(entries);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    console.error('Failed to load entries:', e);
    return {};
  }
};
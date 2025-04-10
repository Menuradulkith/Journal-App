import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEntry, deleteEntry } from '../redux/journalSlice';
import { loadEntries } from '../utils/storage';

export const useEntries = () => {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.journal?.entries || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeEntries = async () => {
      try {
        const loadedEntries = await loadEntries();
        const validEntries = loadedEntries && typeof loadedEntries === 'object' ? loadedEntries : {};
        Object.entries(validEntries).forEach(([date, entryList]) => {
          if (Array.isArray(entryList)) {
            entryList.forEach((entry) => dispatch(addEntry({ date, entry })));
          }
        });
      } catch (error) {
        console.error('Failed to initialize entries:', error);
      } finally {
        setLoading(false);
      }
    };
    initializeEntries();
  }, [dispatch]);

  const entryList = entries && typeof entries === 'object'
    ? Object.entries(entries)
        .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
        .flatMap(([date, entryArray]) => {
          return Array.isArray(entryArray)
            ? entryArray.map((entry) => ({ ...entry, date }))
            : [];
        })
    : [];

  const groupedEntries = {};
  entryList.forEach((entry) => {
    if (!groupedEntries[entry.date]) {
      groupedEntries[entry.date] = [];
    }
    groupedEntries[entry.date].push(entry);
  });

  Object.keys(groupedEntries).forEach((date) => {
    groupedEntries[date].sort((a, b) => {
      return new Date(b.timestamp || b.id) - new Date(a.timestamp || a.id);
    });
  });

  const handleAddEntry = (content, mood, imageUri, date) => {
    const timestamp = new Date().toISOString();
    const entry = {
      id: Date.now(),
      content,
      mood: mood.name,
      moodEmoji: mood.emoji,
      imageUri,
      date,
      timestamp,
    };
    dispatch(addEntry({ date, entry }));
  };

  const handleDeleteEntry = (date, id) => {
    dispatch(deleteEntry({ date, id }));
  };

  return { entries, entryList, groupedEntries, loading, handleAddEntry, handleDeleteEntry };
};
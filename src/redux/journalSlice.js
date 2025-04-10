import { createSlice } from '@reduxjs/toolkit';
import { saveEntries } from '../utils/storage';

const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    entries: {},
  },
  reducers: {
    addEntry: (state, action) => {
      const { date, entry } = action.payload;
      if (!state.entries) state.entries = {};
      if (!state.entries[date]) state.entries[date] = [];
      state.entries[date].push(entry);
    },
    deleteEntry: (state, action) => {
      const { date, id } = action.payload;
      if (!state.entries || !state.entries[date]) return;
      state.entries[date] = state.entries[date].filter(e => e.id !== id);
      if (state.entries[date].length === 0) delete state.entries[date];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => ['journal/addEntry', 'journal/deleteEntry'].includes(action.type),
      (state) => {
        if (state.entries && typeof state.entries === 'object') {
          saveEntries(state.entries);
        }
      }
    );
  },
});

export const { addEntry, deleteEntry } = journalSlice.actions;
export default journalSlice.reducer;
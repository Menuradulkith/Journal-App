import { configureStore } from '@reduxjs/toolkit';
import journalReducer from './journalSlice';

export const store = configureStore({
  reducer: {
    journal: journalReducer,
  },
});
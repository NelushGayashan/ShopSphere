// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Make sure this import is correct

export const store = configureStore({
  reducer: {
    auth: authReducer, // Handle authentication state with this reducer
  },
});

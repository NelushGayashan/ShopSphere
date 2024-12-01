// src/store/authSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, 
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      saveUserToLocalStorage(action.payload); 
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      saveUserToLocalStorage(action.payload); 
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); 
    },
  },
});

const saveUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user)); 
};

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export const register = (userData) => (dispatch) => {
  dispatch(registerStart());
  try {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = existingUsers.find(
      (user) => user.email === userData.email || user.name === userData.name
    );

    if (existingUser) {
      if (existingUser.email === userData.email) {
        throw new Error('Email already exists');
      } else if (existingUser.name === userData.name) {
        throw new Error('Username already exists');
      }
    }

    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    dispatch(registerSuccess(userData)); 
  } catch (error) {
    dispatch(registerFailure(error.message)); 
    throw error;
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = storedUsers.find(
      (u) => u.email === userData.email && u.password === userData.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    dispatch(loginSuccess(user)); 
    localStorage.setItem('user', JSON.stringify(user)); 

  } catch (error) {
    dispatch(loginFailure(error.message || 'Something went wrong'));
    throw error;
  }
};

export default authSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  },
  reducers: {
    clearCredentials: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      state.token = null;
      state.username = null;
    },
  },
});

export const { clearCredentials } = authSlice.actions;
export const currentTokenSelector = (state) => state.auth.token;
export const currentUsernameSelector = (state) => state.auth.username;
export const authorizationError = (state) => state.auth.error;
export default authSlice.reducer;

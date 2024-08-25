/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    clearCredentials: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      state.token = null;
      state.username = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.fetchAuth.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.username = payload.username;
          localStorage.setItem('token', payload.token);
          localStorage.setItem('username', payload.username);
        },
      )
      .addMatcher(
        authApi.endpoints.fetchSignUp.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.username = payload.username;
          localStorage.setItem('token', payload.token);
          localStorage.setItem('username', payload.username);
        },
      );
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const currentTokenSelector = (state) => state.auth.token;
export const currentUsernameSelector = (state) => state.auth.username;
export const authorizationError = (state) => state.auth.error;
export default authSlice.reducer;

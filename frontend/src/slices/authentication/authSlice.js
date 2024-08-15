/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    loadingStatus: 'idle',
    error: null,
  },
  reducers: {
    clearCredentials: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      state.token = null;
      state.username = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.fetchAuth.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(authApi.endpoints.fetchAuth.matchFulfilled, (state, action) => {
        localStorage.setItem('username', action.payload.username);
        localStorage.setItem('token', action.payload.token);
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addMatcher(authApi.endpoints.fetchAuth.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.payload.status;
      })
      .addMatcher(authApi.endpoints.fetchSignUp.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(authApi.endpoints.fetchSignUp.matchFulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        console.log(action.payload);
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addMatcher(authApi.endpoints.fetchSignUp.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.payload.status;
      });
  },
});

export const { clearCredentials } = authSlice.actions;
export const currentTokenSelector = (state) => state.auth.token;
export const currentUsernameSelector = (state) => state.auth.username;
export const authorizationError = (state) => state.auth.error;
export default authSlice.reducer;

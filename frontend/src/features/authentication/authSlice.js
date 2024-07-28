import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (authValues) => {
    const response = await axios.post(routes.loginPath(), authValues);
    return response.data;
  },
);

export const fetchSignUp = createAsyncThunk(
  'auth/fetchSignUp',
  async (signUpValues) => {
    const response = await axios.post(routes.signUpPath(), signUpValues);
    return response.data;
  },
);

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
      .addCase(fetchAuth.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        localStorage.setItem('username', action.payload.username);
        localStorage.setItem('token', action.payload.token);
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSignUp.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        console.log(action.payload);
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchSignUp.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearCredentials } = authSlice.actions;
export const currentTokenSelector = (state) => state.auth.token;
export const currentUsernameSelector = (state) => state.auth.username;
export const authorizationError = (state) => state.auth.error;
export default authSlice.reducer;

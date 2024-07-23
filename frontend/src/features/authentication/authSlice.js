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

export const fetchSingUp = createAsyncThunk(
  'auth/fetchSingUp',
  async (singUpValues) => {
    const response = await axios.post(routes.singUpPath(), singUpValues);
    return response.data;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
    loadingStatus: 'idle',
    error: null,
  },
  reducers: {
    clearCredentials: (state) => {
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
      .addCase(fetchSingUp.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchSingUp.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        console.log(action.payload);
        state.token = action.payload.token;
        state.username = action.payload.username;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchSingUp.rejected, (state, action) => {
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

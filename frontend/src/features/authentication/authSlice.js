import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (authValues) => {
    const response = await axios.post(routes.loginPath(), authValues);
    return response.data.token;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    loadingStatus: 'idle',
    error: null,
  },
  reducers: {
    // setCredentials: (state, action) => {
    //   const { token } = action.payload;
    //   state.token = token || state.token;
    // },
    clearCredentials: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        localStorage.setItem('userToken', action.payload);
        state.token = action.payload;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { clearCredentials } = authSlice.actions;
export const currentTokenSelector = (state) => state.auth.token;
export const authorizationError = (state) => state.auth.error;
export default authSlice.reducer;

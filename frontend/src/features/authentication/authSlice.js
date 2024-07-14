import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token || state.token;
    },
    clearCredentials: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const currentTokenSelector = (state) => state.auth.token;
export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    connected: false,
  },
  reducers: {
    setConnected: (state) => {
      state.connected = true;
    },
    setDisconnected: (state) => {
      state.connected = false;
    },
  },
});

export const currentSocketConnectionStatus = (state) => state.connected;
export const { setConnected, setDisconnected } = socketSlice.actions;
export default socketSlice.reducer;

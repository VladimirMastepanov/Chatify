import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: null,
  reducers: {
    setChannels: (state, action) => {
      const channels = action.payload;
      state.channels = channels;
    },
    addChannel: (state, action) => {
      state.channels = { ...state.channels, ...action.payload };
    },
    editChannel: (state, action) => {
      const { id } = action.payload;
      state.channels[id] = action.payload;
    },
    removeChannel: (state, action) => {
      const { delId = action.payload, ...rest } = state.channels;
      state.channels = rest;
    },
  },
});

export const { setChannels } = channelsSlice.actions;
export const channelsSelector = (state) => state.channels;
export default channelsSlice.reducer;

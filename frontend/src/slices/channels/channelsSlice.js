/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  activeChannelId: '1',
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
});

export const { setActiveChannelId } = channelsSlice.actions;
export const activeChannelIdSelector = (state) => state.channels.activeChannelId;
export default channelsSlice.reducer;

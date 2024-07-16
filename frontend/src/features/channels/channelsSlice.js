import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  entities: {},
  ids: [],
  loading: 'idle',
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      channelsAdapter.setAll(state, action.payload);
    },
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
});

export const {
  addChannel,
  updateChannel,
  removeChannel,
  setChannels,
} = channelsSlice.actions;
export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;

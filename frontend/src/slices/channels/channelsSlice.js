/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { channelsApi } from './channelsApi';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  entities: {},
  ids: [],
  loadingStatus: 'idle',
  error: null,
  activeChannelId: '1',
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addOneChannel: (state, action) => {
      channelsAdapter.addOne(state, action.payload);
    },
    removeOneChannel: (state, action) => {
      channelsAdapter.removeOne(state, action.payload);
    },
    renameOneChannel: (state, action) => {
      channelsAdapter.updateOne(state, action.payload);
    },
    setActiveChannelId: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(channelsApi.endpoints.getChannels.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(channelsApi.endpoints.getChannels.matchFulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addMatcher(channelsApi.endpoints.getChannels.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addMatcher(channelsApi.endpoints.addChannel.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(channelsApi.endpoints.addChannel.matchFulfilled, (state, action) => {
        channelsAdapter.addOne(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
        state.activeChannelId = action.payload.id;
      })
      .addMatcher(channelsApi.endpoints.addChannel.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addMatcher(channelsApi.endpoints.updateChannel.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(channelsApi.endpoints.updateChannel.matchFulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        channelsAdapter.updateOne(state, { id, changes });
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addMatcher(channelsApi.endpoints.updateChannel.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addMatcher(channelsApi.endpoints.removeChannel.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(channelsApi.endpoints.removeChannel.matchFulfilled, (state, action) => {
        channelsAdapter.removeOne(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
        state.activeChannelId = '1';
      })
      .addMatcher(channelsApi.endpoints.removeChannel.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  addOneChannel,
  removeOneChannel,
  renameOneChannel,
  setActiveChannelId,
} = channelsSlice.actions;
export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
export const activeChannelIdSelector = (state) => state.channels.activeChannelId;
export default channelsSlice.reducer;

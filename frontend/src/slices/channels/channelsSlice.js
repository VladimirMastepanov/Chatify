/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes';
import getHeader from '../../helpers/getHeader';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    const response = await axios.get(routes.channelsPath(), getHeader(token));
    return response.data;
  },
);

export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ token, newChannel }) => {
    const response = await axios.post(routes.channelsPath(), newChannel, getHeader(token));
    return response.data;
  },
);

export const updateChannel = createAsyncThunk(
  'channels/updateChannel',
  async ({ token, id, newName }) => {
    const response = await axios.patch(routes.channelPathWithId(id), newName, getHeader(token));
    return response.data;
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ token, id }) => {
    const response = await axios.delete(routes.channelPathWithId(id), getHeader(token));
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  entities: {},
  ids: [],
  loadingStatus: 'idle',
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        channelsAdapter.setAll(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(addChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        channelsAdapter.addOne(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(addChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(updateChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(updateChannel.fulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        channelsAdapter.updateOne(state, { id, changes });
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(updateChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(removeChannel.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        channelsAdapter.removeOne(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(removeChannel.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addOneChannel, removeOneChannel, renameOneChannel } = channelsSlice.actions;
export const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;

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
  async (userToken) => {
    const response = await axios.get(routes.channelsPath(), getHeader(userToken));
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
    addChannel: channelsAdapter.addOne,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
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
      });
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

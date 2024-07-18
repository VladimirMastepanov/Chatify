import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeChannel } from '../channels/channelsSlice';
import routes from '../../routes';
import getHeader from '../../helpers/getHeader';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (userToken) => {
    const response = await axios.get(routes.messagesPath(), getHeader(userToken));
    return response.data;
  },
);

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  entities: {},
  ids: [],
  loadingStatus: 'idle',
  error: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // setMessages: (state, action) => {
    //   messagesAdapter.setAll(state, action.payload);
    // },
    addMessage: messagesAdapter.addOne,
    updateMessage: messagesAdapter.updateOne,
    removeMessage: messagesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const channelId = action.payload;
        const restEntities = Object.values(state.entities)
          .filter((e) => e.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        messagesAdapter.setAll(state, action.payload);
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  addMessage,
  updateMessage,
  removeMessage,
} = messagesSlice.actions;
export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

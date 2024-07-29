import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { removeOneChannel } from '../channels/channelsSlice';
import routes from '../../routes';
import getHeader from '../../helpers/getHeader';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (userToken) => {
    const response = await axios.get(routes.messagesPath(), getHeader(userToken));
    return response.data;
  },
);

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ token, newMessage }) => {
    const response = await axios.post(routes.messagesPath(), newMessage, getHeader(token));
    return response.data;
  },
);

export const updateMessage = createAsyncThunk(
  'messages/updateMessage',
  async ({ token, id, newBody }) => {
    const response = await axios
      .patch(routes.messagesPathWithId(id), newBody, getHeader(token));
    return response.data;
  },
);

export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async ({ token, id }) => {
    const response = await axios.delete(routes.messagesPathWithId(id), getHeader(token));
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
    addOneMessage: (state, action) => {
      messagesAdapter.addOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeOneChannel, (state, action) => {
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
      })
      .addCase(addMessage.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        messagesAdapter.addOne(state, action.payload);
        state.error = null;
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(updateMessage.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        state.loadingStatus = 'idle';
        messagesAdapter.updateOne(state, { id, changes });
        state.error = null;
      })
      .addCase(updateMessage.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(removeMessage.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(removeMessage.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        messagesAdapter.updateOne(state, action.meta.arg.id);
        state.error = null;
      })
      .addCase(removeMessage.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addOneMessage } = messagesSlice.actions;
export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

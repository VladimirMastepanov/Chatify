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

export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async (userToken, newMessage) => {
    const response = await axios.post(routes.messagesPath(), newMessage, getHeader(userToken));
    return response.data;
  },
);

export const updateMessage = createAsyncThunk(
  'messages/updateMessage',
  async (userToken, id, newBody) => {
    const response = await axios
      .patch(routes.messagesPathWithId(id), newBody, getHeader(userToken));
    return response.data;
  },
);

export const removeMessage = createAsyncThunk(
  'messages/removeMessage',
  async (userToken, id) => {
    const response = await axios.delete(routes.messagesPathWithId(id), getHeader(userToken));
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
    addOneMessage: (payload) => {
      messagesAdapter.addCase(payload);
    },
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
      })
      .addCase(addMessage.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        messagesAdapter.addOne(action.payload);
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
        const { id, ...rest } = action.payload;
        state.loadingStatus = 'idle';
        messagesAdapter.updateOne({ id, changes: rest });
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
        messagesAdapter.updateOne(action.payload);
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

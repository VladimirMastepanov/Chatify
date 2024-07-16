import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { removeChannel } from '../channels/channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  entities: {},
  ids: [],
  loading: 'idle',
  error: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      messagesAdapter.setAll(state, action.payload);
    },
    addMessage: messagesAdapter.addOne,
    updateMessage: messagesAdapter.updateOne,
    removeMessage: messagesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelId = action.payload;
      const restEntities = Object.values(state.entities)
        .filter((e) => e.channelId !== channelId);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
  removeMessage,
} = messagesSlice.actions;
export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  loading: 'idle',
  error: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    updateMessage: messagesAdapter.updateOne,
    removeMessage: messagesAdapter.removeOne,
    removeChannelMessages: messagesAdapter.removeMany,
  },
  extraReducers: (builder) => {
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
  removeMessage,
  removeChannelMessages,
} = messagesSlice.actions;
export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

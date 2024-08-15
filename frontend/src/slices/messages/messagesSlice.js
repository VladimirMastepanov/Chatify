/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { messagesApi } from './messagesApi';

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
      .addMatcher(messagesApi.endpoints.getMessages.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(messagesApi.endpoints.getMessages.matchFulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        messagesAdapter.setAll(state, action.payload);
        state.error = null;
      })
      .addMatcher(messagesApi.endpoints.getMessages.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addMatcher(messagesApi.endpoints.addMessage.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(messagesApi.endpoints.addMessage.matchFulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        messagesAdapter.addOne(state, action.payload);
        state.error = null;
      })
      .addMatcher(messagesApi.endpoints.addMessage.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addMatcher(messagesApi.endpoints.updateMessage.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(messagesApi.endpoints.updateMessage.matchFulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        state.loadingStatus = 'idle';
        messagesAdapter.updateOne(state, { id, changes });
        state.error = null;
      })
      .addMatcher(messagesApi.endpoints.updateMessage.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addMatcher(messagesApi.endpoints.removeMessage.matchPending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addMatcher(messagesApi.endpoints.removeMessage.matchFulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        messagesAdapter.updateOne(state, action.meta.arg.id);
        state.error = null;
      })
      .addMatcher(messagesApi.endpoints.removeMessage.matchRejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addOneMessage } = messagesSlice.actions;
export const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;

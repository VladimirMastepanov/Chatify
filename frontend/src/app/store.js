import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authentication/authSlice';
import channelsReducer from '../slices/channels/channelsSlice';
import messagesReducer from '../slices/messages/messagesSlice';
import socketReducer from '../slices/socket/socketSlice';
import modalReducer from '../slices/modal/modalSlice';
import loadPrafanityDictionary from './leoProfanityThunk';
import middlewares from './middlewares/index';
import { authApi } from '../slices/authentication/authApi';
import { channelsApi } from '../slices/channels/channelsApi';
import { messagesApi } from '../slices/messages/messagesApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    channels: channelsReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    messages: messagesReducer,
    socket: socketReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(middlewares)
    .concat(authApi.middleware)
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
});

store.dispatch(loadPrafanityDictionary());

export default store;

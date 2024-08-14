import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authentication/authSlice';
import channelsReducer from '../slices/channels/channelsSlice';
import messagesReducer from '../slices/messages/messagesSlice';
import socketReducer from '../slices/socket/socketSlice';
import modalReducer from '../slices/modal/modalSlice';
import loadPrafanityDictionary from './leoProfanityThunk';
import middlewares from './middlewares/index';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    socket: socketReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

store.dispatch(loadPrafanityDictionary());

export default store;

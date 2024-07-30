import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
import channelsReducer from '../features/channels/channelsSlice';
import messagesReducer from '../features/messages/messagesSlice';
import socketReducer from '../features/socket/socketSlice';
import loadPrafanityDictionary from './leoProfanityThunk';
import middlewares from './middlewares/index';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

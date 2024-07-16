import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
import channelsReducer from '../features/channels/channelsSlice';
import messagesReducer from '../features/messages/messagesSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});

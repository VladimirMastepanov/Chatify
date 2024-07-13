import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});

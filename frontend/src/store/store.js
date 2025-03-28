import {configureStore} from '@reduxjs/toolkit';
import  checkAuth  from '../slices/authSlice';
import getUsers from '../slices/chatSlice';

const store = configureStore({
  reducer: {
    auth: checkAuth,
    chat: getUsers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
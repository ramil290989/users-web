import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice.js';
import pagesReducer from './pagesSlice.js';

const store = configureStore({
  reducer: {
    users: usersReducer,
    pages: pagesReducer,
  },
});

export default store;

/* eslint-disable no-unused-expressions, no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './usersSlice.js';

const initialState = {
  usersChunk: [],
  chunkI: null,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    changeChunkI: (state, { payload }) => {
      state.chunkI = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.usersChunk = [];
        state.chunkI = 0;
        const { userList } = payload;
        const dWidth = window.screen.width;
        const usersPerPage = dWidth > 1000 ? 8 : 4;
        for (let i = 0; i < userList.length; i += usersPerPage) {
          const usersInPage = userList.slice(i, i + usersPerPage);
          state.usersChunk.push(usersInPage);
        }
      });
  },
});

export const { actions } = pagesSlice;
export default pagesSlice.reducer;

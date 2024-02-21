/* eslint-disable no-unused-expressions, no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import useAuthHeader from '../hooks/useAuthHeader.jsx';
import apiRoutes from '../utils/apiRoutes.js';
import getUsersPerPageCount from '../utils/getUsersPerPageCount.js';

export const fetchUsers = createAsyncThunk(
  'fetchUsers',
  async () => {
    const headers = useAuthHeader();
    const path = apiRoutes.fetchData();
    const response = await axios.get(path, headers);
    return response.data;
  },
);

const initialState = {
  loadingStatus: 'loading',
  error: null,
  uid: null,
  favoriteUsers: [],
  userList: [],
  usersChunk: [],
  chunkI: 0,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addRemoveLike: (state, { payload }) => {
      const removedItem = 1;
      state.favoriteUsers.includes(payload)
        ? state.favoriteUsers.splice(state.favoriteUsers.indexOf(payload), removedItem)
        : state.favoriteUsers.push(payload);
    },
    changeChunkI: (state, { payload }) => {
      state.chunkI = payload;
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    resetData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        const { uId, favoriteUsers, userList } = payload;
        state.loadingStatus = 'complete';
        state.error = null;
        state.uId = uId;
        state.favoriteUsers = favoriteUsers;
        state.userList = userList;
        state.usersChunk = [];
        const windowWidth = window.screen.width;
        const usersPerPage = getUsersPerPageCount(windowWidth);
        for (let i = 0; i < userList.length; i += usersPerPage) {
          const usersInPage = userList.slice(i, i + usersPerPage);
          state.usersChunk.push(usersInPage);
        }
      })
      .addCase(fetchUsers.rejected, (state, { error }) => {
        state.loadingStatus = 'failed';
        state.error = error;
      });
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;

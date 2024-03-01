/* eslint-disable no-unused-expressions, no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import useAuthHeader from '../hooks/useAuthHeader.jsx';
import apiRoutes from '../utils/apiRoutes.js';
import getUsersPerPageCount from '../utils/getUsersPerPageCount.js';

export const fetchUsers = createAsyncThunk(
  'fetchUsers',
  async (token) => {
    const headers = useAuthHeader(token);
    const path = apiRoutes.fetchData();
    const response = await axios.get(path, headers);
    return response.data;
  },
);
export const addRemoveLike = createAsyncThunk(
  'addRemoveLike',
  async ({ id, token }) => {
    const likeId = id;
    const headers = useAuthHeader(token);
    const likePath = apiRoutes.like();
    await axios.post(likePath, { likeId }, headers);
    return likeId;
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
      })
      .addCase(addRemoveLike.fulfilled, (state, { payload }) => {
        const removedItem = 1;
        state.favoriteUsers.includes(payload)
          ? state.favoriteUsers.splice(state.favoriteUsers.indexOf(payload), removedItem)
          : state.favoriteUsers.push(payload);
      });
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;

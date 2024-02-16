/* eslint-disable no-unused-expressions, no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import useAuthHeader from '../hooks/useAuthHeader.jsx';
import apiRoutes from '../apiRoutes.js';

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
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addRemoveLike: (state, { payload }) => {
      const removedItem = 1;
      state.favoriteUsers.includes(payload.id)
        ? state.favoriteUsers.splice(state.favoriteUsers.indexOf(payload.id), removedItem)
        : state.favoriteUsers.push(payload.id);
    },
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
      })
      .addCase(fetchUsers.rejected, (state, { error }) => {
        state.loadingStatus = 'failed';
        state.error = error;
      });
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;

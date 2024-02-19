/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../slices/usersSlice.js';
import Header from '../../components/Header.jsx';
import Users from '../../components/Users.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.users.loadingStatus);

  useEffect(() => {
    if (loadingStatus === 'loading') {
      dispatch(fetchUsers());
    }
  }, [loadingStatus]);

  switch (loadingStatus) {
    case 'loading':
      return (
        <>
          <Header />
          загрузка
        </>
      );
    case 'failed':
      return (
        <>
          <Header />
          ошибка загрузки
        </>
      );
    case 'complete':
      return (
        <>
          <Header />
          <Users />
        </>
      );
    default:
      return null;
  }
};

export default MainPage;

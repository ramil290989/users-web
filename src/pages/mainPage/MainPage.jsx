/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../slices/usersSlice.js';
import UsersPagination from '../../components/UsersPagination.jsx';
import MainHeaderContent from '../../components/MainHeader.jsx';

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
          <MainHeaderContent />
          загрузка
        </>
      );
    case 'failed':
      return (
        <>
          <MainHeaderContent />
          ошибка загрузки
        </>
      );
    case 'complete':
      return (
        <>
          <MainHeaderContent />
          <UsersPagination />
        </>
      );
    default:
      return null;
  }
};

export default MainPage;

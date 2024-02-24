/* eslint-disable no-unused-expressions */
import React from 'react';
import { useSelector } from 'react-redux';
import UsersPagination from '../../components/UsersPagination.jsx';
import MainHeaderContent from '../../components/MainHeader.jsx';

const MainPage = () => {
  const loadingStatus = useSelector((state) => state.users.loadingStatus);

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

/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../slices/usersSlice.js';
import { usersSelectors } from '../../slices/index.js';
import UsersPagination from '../../components/UsersPagination.jsx';
import MainHeaderContent from '../../components/MainHeader.jsx';
import useLogOut from '../../hooks/useLogOut.jsx';
import LoadingError from '../../components/LoadingError.jsx';
import Loading from '../../components/Loading.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const logOut = useLogOut();

  const loadingStatus = useSelector(usersSelectors.loadingStatus);
  const loadingError = useSelector(usersSelectors.error);

  useEffect(() => {
    if (loadingStatus === 'loading') {
      dispatch(fetchUsers());
    }
    if (loadingStatus === 'failed' && /403/.test(loadingError.message)) {
      logOut();
    }
  }, [loadingStatus, loadingError]);

  switch (loadingStatus) {
    case 'loading':
      return (
        <>
          <MainHeaderContent />
          <Loading />
        </>
      );
    case 'failed':
      return (
        <>
          <MainHeaderContent />
          <LoadingError />
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

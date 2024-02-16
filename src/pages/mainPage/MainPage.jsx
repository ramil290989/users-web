/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../slices/usersSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.users.loadingStatus);
  const users = useSelector((state) => state.users.userList);

  useEffect(() => {
    if (loadingStatus === 'loading') {
      dispatch(fetchUsers());
    }
  }, [loadingStatus]);

  return (
    <>
      <div className="header">
        <div className="header-text-frame">
          <h1 className="text-h1 header-text">Наша команда</h1>
          <p className="text-h2 header-text">Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.</p>
        </div>
      </div>
      {users.map((u) => (u.name))}
    </>
  );
};

export default MainPage;

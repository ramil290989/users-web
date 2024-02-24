import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usersSelectors } from '../slices/index.js';
import Header from './Header.jsx';

const UserHeader = () => {
  const naigate = useNavigate();
  const all = useSelector(usersSelectors.allUsers);
  if (!all.legth) {
    return null;
  }
  const { avatar, name, profession } = useSelector(usersSelectors.selectedUser);
  return (
    <Header>
      <button
        type="button"
        className="button-header button-back text"
        onClick={() => {
          naigate(-1);
        }}
      >
        <span className="span-button-exit">Назад</span>
      </button>
      <div className="container">
        <div className="header-users">
          <div>
            <img src={avatar} alt="userPhoto" className="avatar" />
          </div>
          <div className="text-white">
            <h1 className="text-h1">{name}</h1>
            <p className="text-profession">{profession}</p>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default UserHeader;

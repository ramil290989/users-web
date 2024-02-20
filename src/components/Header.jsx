import React from 'react';
import useLogOut from '../hooks/useLogOut.jsx';

const Header = () => {
  const logOut = useLogOut();
  return (
    <div className="header">
      <button
        type="button"
        className="button-exit text"
        onClick={() => logOut()}
      >
        <span className="span-button-exit">Выход</span>
      </button>
      <div className="header-text-frame">
        <h1 className="text-h1 header-text">Наша команда</h1>
        <p className="text-h2 header-text">Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.</p>
      </div>
    </div>
  );
};

export default Header;

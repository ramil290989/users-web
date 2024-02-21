import React from 'react';
import useLogOut from '../hooks/useLogOut.jsx';

const Header = ({ children }) => {
  const logOut = useLogOut();
  return (
    <div className="header">
      <button
        type="button"
        className="button-header button-exit text"
        onClick={() => logOut()}
      >
        <span className="span-button-exit">Выход</span>
      </button>
      { children }
    </div>
  );
};

export default Header;

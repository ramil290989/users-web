import React, { useState } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './slices/index.js';
import TokenContext from './context/TokenContext.jsx';
import App from './App.jsx';

const Init = () => {
  const [token, setToken] = useState(localStorage.getItem('usersToken'));
  return (
    <Provider store={store}>
      <TokenContext.Provider value={{ token, setToken }}>
        <App />
      </TokenContext.Provider>
    </Provider>
  );
};

export default Init;

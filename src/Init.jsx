import React, { useState } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './slices/index.js';
import AuthContext from './context/AuthContext.jsx';
import App from './App.jsx';

const Init = () => {
  const email = localStorage.getItem('usersEmail');
  const token = localStorage.getItem('usersToken');
  const [authData, setAuthData] = useState({ email, token });
  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ authData, setAuthData }}>
        <App />
      </AuthContext.Provider>
    </Provider>
  );
};

export default Init;

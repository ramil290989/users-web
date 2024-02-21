import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import store from './slices/index.js';
import AuthContext from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PrivateRoute from './pages/mainPage/PrivateRoute.jsx';
import MainPage from './pages/mainPage/MainPage.jsx';
import Footer from './components/Footer.jsx';
import UserPage from './pages/UserPage.jsx';

const App = () => {
  const email = localStorage.getItem('usersEmail');
  const token = localStorage.getItem('usersToken');
  const [authData, setAuthData] = useState({ email, token });
  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ authData, setAuthData }}>
        <div className="content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateRoute><MainPage /></PrivateRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { usersSelectors } from './slices/index.js';
import { fetchUsers } from './slices/usersSlice.js';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import PrivateRoute from './pages/mainPage/PrivateRoute.jsx';
import MainPage from './pages/mainPage/MainPage.jsx';
import Footer from './components/Footer.jsx';
import UserPage from './pages/UserPage.jsx';

const App = () => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(usersSelectors.loadingStatus);

  useEffect(() => {
    if (loadingStatus === 'loading') {
      dispatch(fetchUsers());
    }
  }, [loadingStatus]);

  return (
    <>
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
    </>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import MainPage from './pages/mainPage/MainPage.jsx';
import Footer from './components/Footer.jsx';
import UserPage from './pages/UserPage.jsx';
import PrivateRoute from './pages/mainPage/PrivateRoute.jsx';

const App = () => (
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

export default App;

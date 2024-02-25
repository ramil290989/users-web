import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiRoutes from '../utils/apiRoutes.js';
import AuthContext from '../context/AuthContext.jsx';

const LoginPage = () => {
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async ({ email, password }) => {
        setIsDisabled(true);
        setError(null);
        const loginRoute = apiRoutes.login();
        const loginData = { email, password };
        try {
          const authData = await axios.post(loginRoute, loginData);
          const { token } = authData.data;
          localStorage.setItem('usersEmail', email);
          localStorage.setItem('usersToken', token);
          setAuthData({ email, token });
          navigate('/');
        } catch (e) {
          setError(e.message);
        } finally {
          setIsDisabled(false);
        }
      }}
    >
      {(formProps) => (
        <form onSubmit={formProps.handleSubmit} className="form-card-outer">
          <div className="form-card">
            <h2 className="text-h2">Авторизация</h2>
            <div className="input-box">
              <label htmlFor="email" className="text">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={(formProps.errors.email && formProps.touched.email) || error ? 'invalid-input' : null}
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                disabled={isDisabled}
                required
              />
            </div>
            <div className="input-box">
              <label htmlFor="password" className="text">Пароль</label>
              <input
                type={isHidden ? 'password' : 'text'}
                id="password"
                name="password"
                className={(formProps.errors.password && formProps.touched.password) || error ? 'invalid-input' : null}
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                disabled={isDisabled}
                required
              />
              <button
                type="button"
                aria-label="eyeButton"
                className="eye-button"
                style={{
                  backgroundImage: (
                    isHidden
                      ? 'url("./eye_off.svg")'
                      : 'url("./eye_on.svg")'
                  ),
                }}
                onClick={() => setIsHidden(!isHidden)}
              />
              {(formProps.errors.password && formProps.touched.password) || error
                ? <div className="invalid-message">{formProps.errors.password ?? error}</div>
                : null}
            </div>
            <button type="submit" className="button-regular w-100 mt-24 text">Авторизоваться</button>
            <a className="mt-24" href="/register">Зарегистрироваться</a>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginPage;

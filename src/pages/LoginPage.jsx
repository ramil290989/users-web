/* eslint-disable no-unused-expressions */
import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiRoutes from '../utils/apiRoutes.js';
import { validationLogin } from '../utils/validationSchemas.js';
import TokenContext from '../context/TokenContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [isHidden, setIsHidden] = useState(true);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationLogin}
      onSubmit={async ({ email, password }) => {
        setIsDisabled(true);
        setError(null);
        const loginRoute = apiRoutes.login();
        const loginData = { email, password };
        await axios.post(loginRoute, loginData)
          .then((response) => {
            const { token } = response.data;
            localStorage.setItem('usersToken', token);
            setToken(token);
            navigate('/');
          })
          .catch((e) => {
            e.response && e.response.status === 401
              ? setError('Неверный Email или пароль')
              : setError('Ошибка сети');
          })
          .finally(() => {
            setIsDisabled(false);
          });
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
              {(formProps.errors.email && formProps.touched.email)
                ? <div className="invalid-message">{formProps.errors.email}</div>
                : null}
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
            <button type="submit" disabled={isDisabled} className="button-regular w-100 mt-24 text">Авторизоваться</button>
            <a className="mt-24" href="/register">Зарегистрироваться</a>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginPage;

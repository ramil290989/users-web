/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validationRegister } from '../utils/validationSchemas.js';
import apiRoutes from '../utils/apiRoutes.js';

const RegisterPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [passwordIsHidden, setPasswordIsHidden] = useState(true);
  const [confirmPasswordIsHidden, setConfirmPasswordIsHidden] = useState(true);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationRegister}
      onSubmit={async ({ name, email, password }) => {
        setIsDisabled(true);
        setError(null);
        const registerRoute = apiRoutes.register();
        const registerData = { name, email, password };
        try {
          const authData = await axios.post(registerRoute, registerData);
          const { token } = authData.data;
          localStorage.setItem('usersToken', token);
          navigate('/');
        } catch (e) {
          e.response && e.response.status === 409
            ? setError('Пользователь с таким Email уже существует')
            : setError('Ошибка сети');
        } finally {
          setIsDisabled(false);
        }
      }}
    >
      {(formProps) => (
        <form onSubmit={formProps.handleSubmit} className="form-card-outer">
          <div className="form-card">
            <h2 className="text-h2">Регистрация</h2>
            <div className="input-box">
              <label htmlFor="name" className="text">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                className={(formProps.errors.name && formProps.touched.name) || error ? 'invalid-input' : null}
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                disabled={isDisabled}
                required
              />
              {(formProps.errors.name && formProps.touched.name)
                ? <div className="invalid-message">{formProps.errors.name}</div>
                : null}
            </div>
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
                type={passwordIsHidden ? 'password' : 'text'}
                id="password"
                name="password"
                className={(formProps.errors.password && formProps.touched.password) || error ? 'invalid-input' : null}
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                disabled={isDisabled}
                required
              />
              {(formProps.errors.password && formProps.touched.password)
                ? <div className="invalid-message">{formProps.errors.password}</div>
                : null}
              <button
                type="button"
                aria-label="eyeButton"
                className="eye-button"
                style={{
                  backgroundImage: (
                    passwordIsHidden
                      ? 'url("./eye_off.svg")'
                      : 'url("./eye_on.svg")'
                  ),
                }}
                onClick={() => setPasswordIsHidden(!passwordIsHidden)}
              />
            </div>
            <div className="input-box">
              <label htmlFor="confirmPassword" className="text">Подтвердите пароль</label>
              <input
                type={confirmPasswordIsHidden ? 'password' : 'text'}
                id="confirmPassword"
                name="confirmPassword"
                className={(formProps.errors.confirmPassword && formProps.touched.confirmPassword) || error ? 'invalid-input' : null}
                onChange={formProps.handleChange}
                onBlur={formProps.handleBlur}
                disabled={isDisabled}
                required
              />
              {(formProps.errors.confirmPassword && formProps.touched.confirmPassword) || error
                ? <div className="invalid-message">{formProps.errors.confirmPassword ?? error}</div>
                : null}
              <button
                type="button"
                aria-label="eyeButton"
                className="eye-button"
                style={{
                  backgroundImage: (
                    confirmPasswordIsHidden
                      ? 'url("./eye_off.svg")'
                      : 'url("./eye_on.svg")'
                  ),
                }}
                onClick={() => setConfirmPasswordIsHidden(!confirmPasswordIsHidden)}
              />
            </div>
            <button type="submit" disabled={isDisabled} className="button-regular w-100 mt-24 text">Зарегистрироваться</button>
            <a className="mt-24" href="/login">Авторизоваться</a>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterPage;

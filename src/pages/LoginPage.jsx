/* eslint-disable no-unused-expressions */
import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiRoutes from '../utils/apiRoutes.js';
import { validationLogin } from '../utils/validationSchemas.js';
import TokenContext from '../context/TokenContext.jsx';
import InputBox from '../components/InputBox.jsx';
import ErrorNotification from '../components/ErrorNotification.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const [isHidden, setIsHidden] = useState(true);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const emailInputProps = {
    id: 'email',
    label: 'Email',
    type: 'email',
    error,
  };
  const passwordInputProps = {
    id: 'password',
    label: 'Пароль',
    type: 'password',
    error,
  };
  const stateProps = { isDisabled, isHidden, setIsHidden };

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
            <InputBox
              mainProps={emailInputProps}
              formProps={formProps}
              stateProps={stateProps}
            />
            <InputBox
              mainProps={passwordInputProps}
              formProps={formProps}
              stateProps={stateProps}
            />
            {error ? <ErrorNotification message={error} /> : null}
            <button type="submit" disabled={isDisabled} className="button-regular w-100 mt-24 text">Авторизоваться</button>
            <a className="mt-24" href="/register">Зарегистрироваться</a>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginPage;

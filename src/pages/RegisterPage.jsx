/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validationRegister } from '../utils/validationSchemas.js';
import apiRoutes from '../utils/apiRoutes.js';
import InputBox from '../components/InputBox.jsx';
import ErrorNotification from '../components/ErrorNotification.jsx';

const RegisterPage = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [passwordIsHidden, setPasswordIsHidden] = useState(true);
  const [confirmPasswordIsHidden, setConfirmPasswordIsHidden] = useState(true);

  const nameInputProps = {
    id: 'name',
    label: 'Имя',
    type: 'text',
    error,
  };
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
  const confirmPasswordInputProps = {
    id: 'confirmPassword',
    label: 'Подтвердите пароль',
    type: 'password',
    error,
  };
  const stateProps = {
    isDisabled,
    isHidden: passwordIsHidden,
    setIsHidden: setPasswordIsHidden,
  };
  const confirmPasswordStateProps = {
    isDisabled,
    isHidden: confirmPasswordIsHidden,
    setIsHidden: setConfirmPasswordIsHidden,
  };
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
            <InputBox
              mainProps={nameInputProps}
              formProps={formProps}
              stateProps={stateProps}
            />
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
            <InputBox
              mainProps={confirmPasswordInputProps}
              formProps={formProps}
              stateProps={confirmPasswordStateProps}
            />
            {error ? <ErrorNotification message={error} /> : null}
            <button type="submit" disabled={isDisabled} className="button-regular w-100 mt-24 text">Зарегистрироваться</button>
            <a className="mt-24" href="/login">Авторизоваться</a>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterPage;

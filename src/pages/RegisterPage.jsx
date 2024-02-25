import React, { useState } from 'react';

const RegisterPage = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);

  return (
    <div className="form-card-outer">
      <div className="form-card">
        <h2 className="text-h2">Регистрация</h2>
        <div className="input-box">
          <label htmlFor="name" className="text">Имя</label>
          <input id="name" type="text" />
        </div>
        <div className="input-box">
          <label htmlFor="email" className="text">Email</label>
          <input type="text" id="email" />
        </div>
        <div className="input-box">
          <label htmlFor="password" className="text">Пароль</label>
          <input id="password" type={passwordHidden ? 'password' : 'text'} />
          <button
            type="button"
            aria-label="eyeButton"
            className="eye-button"
            style={{
              backgroundImage: (
                passwordHidden
                  ? 'url("./eye_off.svg")'
                  : 'url("./eye_on.svg")'
              ),
            }}
            onClick={() => setPasswordHidden(!passwordHidden)}
          />
        </div>
        <div className="input-box">
          <label htmlFor="confirmPassword" className="text">Подтвердите пароль</label>
          <input id="confirmPassword" type={confirmPasswordHidden ? 'password' : 'text'} />
          <button
            type="button"
            aria-label="eyeButton"
            className="eye-button"
            style={{
              backgroundImage: (
                confirmPasswordHidden
                  ? 'url("./eye_off.svg")'
                  : 'url("./eye_on.svg")'
              ),
            }}
            onClick={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
          />
        </div>
        <button type="button" className="button-regular w-100 mt-24 text">Зарегистрироваться</button>
        <a className="mt-24" href="/login">Авторизоваться</a>
      </div>
    </div>
  );
};

export default RegisterPage;

/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import EyeButton from './EyeButton.jsx';
import ErrorNotification from './ErrorNotification.jsx';

const InputBox = ({ mainProps, formProps, stateProps }) => {
  const { isDisabled, isHidden, setIsHidden } = stateProps;
  const {
    id,
    label,
    type,
    error,
  } = mainProps;
  const [passwordType, setPassworType] = useState('password');

  useEffect(() => {
    isHidden ? setPassworType('password') : setPassworType('text');
  }, [passwordType, isHidden]);

  return (
    <div className="input-box">
      <label htmlFor="email" className="text">{label}</label>
      <input
        type={type === 'password' ? passwordType : type}
        id={id}
        name={id}
        className={(formProps.errors[id] && formProps.touched[id]) || error ? 'invalid-input' : null}
        onChange={formProps.handleChange}
        onBlur={formProps.handleBlur}
        disabled={isDisabled}
        required
      />
      {type === 'password'
        ? <EyeButton isHidden={isHidden} setIsHidden={setIsHidden} />
        : null}
      {(formProps.errors[id] && formProps.touched[id])
        ? <ErrorNotification message={formProps.errors[id]} />
        : null}
    </div>
  );
};

export default InputBox;

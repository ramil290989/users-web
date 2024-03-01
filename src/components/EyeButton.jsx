import React from 'react';

const EyeButton = ({ isHidden, setIsHidden }) => (
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
);

export default EyeButton;

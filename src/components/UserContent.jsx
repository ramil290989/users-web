import React from 'react';
import { useSelector } from 'react-redux';
import { usersSelectors } from '../slices/index.js';

const UserContent = () => {
  const { about, email, phone } = useSelector(usersSelectors.selectedUser);
  return (
    <div className="container">
      <div className="user-content">
        <div className="user-description text">
          {about}
        </div>
        <div className="user-contacts text">
          <div className="contact-item">
            <img src="./phone.svg" alt="phone" className="icon-small" />
            {phone}
          </div>
          <div className="contact-item">
            <img src="./envelope.svg" alt="envelope" />
            {email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContent;

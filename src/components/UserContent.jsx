import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usersSelectors } from '../slices/index.js';

const UserContent = () => {
  const loadingStatus = useSelector(usersSelectors.loadingStatus);
  const [data, setData] = useState(null);
  const user = useSelector(usersSelectors.selectedUser);

  useEffect(() => {
    if (loadingStatus === 'complete') {
      setData(user);
    }
  }, [loadingStatus]);

  return data !== null
    ? (
      <div className="container">
        <div className="user-content">
          <div className="user-description text">
            {data.about}
          </div>
          <div className="user-contacts text">
            <div className="contact-item">
              <img src="./phone.svg" alt="phone" className="icon-small" />
              {data.phone}
            </div>
            <div className="contact-item">
              <img src="./envelope.svg" alt="envelope" />
              {data.email}
            </div>
          </div>
        </div>
      </div>
    )
    : null;
};

export default UserContent;

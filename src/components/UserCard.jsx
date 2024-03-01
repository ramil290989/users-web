/* eslint-disable
  react/prop-types,
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-static-element-interactions,
*/
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addRemoveLike } from '../slices/usersSlice.js';
import TokenContext from '../context/TokenContext.jsx';

const UserCard = ({ user }) => {
  const { token } = useContext(TokenContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, avatar, id } = user;
  const likes = useSelector((state) => state.users.favoriteUsers);

  return (
    <div
      className="user-card"
      onClick={({ target }) => {
        if (target.tagName !== 'BUTTON') {
          localStorage.setItem('usersSelectedUId', id);
          navigate('/user');
        }
      }}
    >
      <img className="avatar" src={avatar} alt="avatar-small" />
      <h2 className="text-h2">{name}</h2>
      <button
        type="button"
        className="button-like"
        aria-label="likeButton"
        style={{
          backgroundImage: (
            likes.includes(id)
              ? 'url("./like_on.svg")'
              : 'url("./like_off.svg")'
          ),
        }}
        onClick={() => dispatch(addRemoveLike({ id, token }))}
      />
    </div>
  );
};

export default UserCard;

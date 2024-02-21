/* eslint-disable
  react/prop-types,
  jsx-a11y/click-events-have-key-events,
  jsx-a11y/no-static-element-interactions,
*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { actions as usersActions } from '../slices/usersSlice.js';
import useAuthHeader from '../hooks/useAuthHeader.jsx';
import apiRoutes from '../utils/apiRoutes.js';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, avatar, id } = user;
  const likes = useSelector((state) => state.users.favoriteUsers);
  return (
    <div
      className="user-card"
      onClick={() => {
        dispatch(usersActions.setCurrentUser(user));
        navigate('/user');
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
        onClick={async () => {
          try {
            const headers = useAuthHeader();
            const likePath = apiRoutes.like();
            const likeId = id;
            const res = await axios.post(likePath, { likeId }, headers);
            if (res.status === 200) {
              dispatch(usersActions.addRemoveLike(id));
            }
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </div>
  );
};

export default UserCard;

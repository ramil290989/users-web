/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { actions as usersActions } from '../slices/usersSlice.js';
import useAuthHeader from '../hooks/useAuthHeader.jsx';
import apiRoutes from '../apiRoutes.js';

const UserCard = (props) => {
  const dispatch = useDispatch();
  const { name, avatar, id } = props;
  const likes = useSelector((state) => state.users.favoriteUsers);
  return (
    <div className="user-card">
      <img className="avatar" src={avatar} alt="avatar" />
      <h2 className="text-h2">{name}</h2>
      <button
        type="button"
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
            const res = await axios.post(likePath, likeId, headers);
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

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as pagesActions } from '../slices/pagesSlice.js';
import UserCard from './UserCard.jsx';

const Users = () => {
  const dispatch = useDispatch();
  const chunkI = useSelector((state) => state.pages.chunkI);
  const usersChunk = useSelector((state) => state.pages.usersChunk);
  const users = usersChunk[chunkI];

  return (
    <div>
      {users.map((u) => (
        <UserCard key={u.id} name={u.name} avatar={u.avatar} id={u.id} />
      ))}
      {usersChunk.map((u, i) => (
        <button key={u[0].id} type="button" onClick={() => dispatch(pagesActions.changeChunkI(i))}>{i + 1}</button>
      ))}
    </div>
  );
};

export default Users;

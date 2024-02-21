import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as usersActions } from '../slices/usersSlice.js';
import UserCard from './UserCard.jsx';

const UsersPagination = () => {
  const dispatch = useDispatch();
  const chunkI = useSelector((state) => state.users.chunkI);
  const usersChunk = useSelector((state) => state.users.usersChunk);
  const users = usersChunk[chunkI];

  return (
    <div className="container-pagination">
      <div className="users">
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
          />
        ))}
      </div>
      <div className="pagination">
        {usersChunk.map((u, i) => (
          <button
            key={u[0].id}
            type="button"
            className="button-regular"
            disabled={chunkI === i}
            onClick={() => dispatch(usersActions.changeChunkI(i))}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersPagination;

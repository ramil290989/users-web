const allUsers = (state) => state.users.userList;

const selectedUser = (state) => {
  const id = Number(localStorage.getItem('usersSelectedUId'));
  const user = state.users.userList.find((u) => u.id === id);
  return user;
};

const loadingStatus = (state) => state.users.loadingStatus;

const error = (state) => state.users.error;

export {
  allUsers,
  selectedUser,
  loadingStatus,
  error,
};

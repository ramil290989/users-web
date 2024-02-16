const useAuthHeader = () => {
  const token = localStorage.getItem('usersToken');
  const authHeader = {
    headers: {
      auth: token,
    },
  };
  return authHeader;
};

export default useAuthHeader;

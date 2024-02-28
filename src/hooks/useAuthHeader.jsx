const useAuthHeader = (token) => {
  const authHeader = {
    headers: {
      auth: token,
    },
  };
  return authHeader;
};

export default useAuthHeader;

const server = process.env.REACT_APP_API_SERVER;

const apiRoutes = {
  login: () => `${server}/api/login`,
  register: () => `${server}/api/register`,
  fetchData: () => `${server}/api/data`,
  like: () => `${server}/api/like`,
};

export default apiRoutes;

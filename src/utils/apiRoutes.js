import env from 'react-dotenv';

const server = env.REACT_APP_SERVER;

const apiRoutes = {
  login: () => `${server}/api/login`,
  register: () => `${server}/api/register`,
  fetchData: () => `${server}/api/data`,
  like: () => `${server}/api/like`,
};

export default apiRoutes;

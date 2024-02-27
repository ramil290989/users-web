const server = process.env.SERVER || 'http://localhost:3003';

const apiRoutes = {
  login: () => `${server}/api/login`,
  register: () => `${server}/api/register`,
  fetchData: () => `${server}/api/data`,
  like: () => `${server}/api/like`,
};

export default apiRoutes;

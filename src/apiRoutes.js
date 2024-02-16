const server = process.env.SERVER || 'http://localhost:3003';

const apiRoutes = {
  login: () => `${server}/api/login`,
  fetchData: () => `${server}/api/data`,
};

export default apiRoutes;

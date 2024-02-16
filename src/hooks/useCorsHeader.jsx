const useCorsHeader = () => {
  const authHeader = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  return authHeader;
};

export default useCorsHeader;

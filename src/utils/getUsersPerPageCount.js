/* eslint-disable consistent-return */
const getUsersPerPageCount = (windowWidth) => {
  const screenWidth = {
    s: 320,
    m: 480,
    l: 576,
    x: 768,
    xl: 992,
    xxl: 1200,
    xxxl: 1400,
  };

  const usersCount = {
    few: 4,
    middle: 6,
    many: 8,
  };

  if (windowWidth <= screenWidth.x) {
    return usersCount.few;
  }
  if (windowWidth > screenWidth.x && windowWidth <= screenWidth.xxl) {
    return usersCount.middle;
  }
  if (windowWidth > screenWidth.xxl) {
    return usersCount.many;
  }
};

export default getUsersPerPageCount;

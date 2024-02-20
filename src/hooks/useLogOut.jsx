import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import AuthContext from '../context/AuthContext.jsx';
import { actions as usersActions } from '../slices/usersSlice.js';

const useLogOut = () => {
  const dispatch = useDispatch();
  const { setAuthData } = useContext(AuthContext);
  const logOut = () => {
    localStorage.removeItem('usersEmail');
    localStorage.removeItem('usersToken');
    setAuthData({});
    dispatch(usersActions.resetData());
  };
  return logOut;
};

export default useLogOut;

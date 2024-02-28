import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions as usersActions } from '../slices/usersSlice.js';
import TokenContext from '../context/TokenContext.jsx';

const useLogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const logOut = () => {
    localStorage.removeItem('usersToken');
    setToken(null);
    dispatch(usersActions.resetData());
    navigate('/login');
  };
  return logOut;
};

export default useLogOut;

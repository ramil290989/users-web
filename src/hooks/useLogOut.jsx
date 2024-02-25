import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actions as usersActions } from '../slices/usersSlice.js';

const useLogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('usersEmail');
    localStorage.removeItem('usersToken');
    dispatch(usersActions.resetData());
    navigate('/login');
  };
  return logOut;
};

export default useLogOut;

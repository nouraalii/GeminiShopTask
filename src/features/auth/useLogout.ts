import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from './authSlice';
import { api } from '../../services/api';

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(logout());
    dispatch(api.util.resetApiState());
    navigate('/login');
  };
}

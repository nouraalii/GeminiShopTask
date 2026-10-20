import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectToken } from '../features/auth/authSlice';

function ProtectedRoute() {
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectToken } from '../features/auth/authSlice';

function PublicOnlyRoute() {
  const token = useAppSelector(selectToken);

  if (token) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;

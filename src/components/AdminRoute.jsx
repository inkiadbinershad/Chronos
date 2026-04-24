import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function AdminRoute({ children }) {
  const isAdmin = useAuthStore(state => state.isAdmin);
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
}


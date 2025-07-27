

import { Navigate } from 'react-router';
import { getUserRole, isAuthenticated } from './Auth';
// import { isAuthenticated, getUserRole } from '../utils/auth';

/**
 * Role Based Route Component
 * @param {ReactNode} children - Protected component/layout
 * @param {string} requiredRole - যে role এর access আছে
 */
const RoleBasedRoute = ({ children, requiredRole }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleBasedRoute;


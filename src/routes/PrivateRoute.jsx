// components/PrivateRoute.jsx
// এই component দিয়ে general private routes protect করবেন

import { Navigate, useLocation } from 'react-router';
import { getUserRole, isAuthenticated } from '../components/utility/Auth';
// import { isAuthenticated, getUserRole } from '../utils/auth';

/**
 * Private Route Component
 * @param {ReactNode} children - Protected component
 * @param {Array} allowedRoles - যে roles access করতে পারবে (optional)
 */
const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  // Step 1: User logged in আছে কিনা check
  if (!isAuth) {
    // Login page এ redirect করব, আর current location save করব
    // Login এর পর user যেই page access করতে চেয়েছিল সেখানে নিয়ে যাবে
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Step 2: Specific roles required আছে কিনা check
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // User এর role allowed না হলে তার appropriate dashboard এ পাঠাবো
    switch (userRole) {
      case 'admin':
        return <Navigate to="/admin/home" replace />;
      case 'seller':
        return <Navigate to="/seller/home" replace />;
      case 'user':
        return <Navigate to="/" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }


  return children;
};

export default PrivateRoute;


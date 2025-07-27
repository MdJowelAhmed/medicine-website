// utils/auth.js
// এই file এ authentication related সব utility functions থাকবে

/**
 * LocalStorage থেকে access token নিয়ে আসে
 * @returns {string|null} - Token বা null
 */
export const getTokenFromStorage = () => {
  return localStorage.getItem('accessToken');
};

/**
 * JWT token decode করে user information বের করে
 * @param {string} token - JWT token
 * @returns {object|null} - User object বা null
 */
export const getUserFromToken = (token) => {
  if (!token) return null;
  
  try {
    // JWT token এর middle part decode করি (payload)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
};

/**
 * User authenticated কিনা check করে
 * @returns {boolean} - true/false
 */
export const isAuthenticated = () => {
  const token = getTokenFromStorage();
  if (!token) return false;
  
  const user = getUserFromToken(token);
  if (!user) return false;
  
  // Token expiry check করি
  const currentTime = Date.now() / 1000;
  return user.exp > currentTime;
};

/**
 * Current user এর role return করে
 * @returns {string|null} - User role বা null
 */
export const getUserRole = () => {
  const token = getTokenFromStorage();
  const user = getUserFromToken(token);
  return user?.role || null;
};

/**
 * User logout করার function
 */
export const logout = () => {
  localStorage.removeItem('accessToken');
  // অন্যান্য storage clear করতে পারেন
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userInfo');
};

/**
 * Token localStorage এ save করার function
 * @param {string} token - JWT token
 */
export const saveToken = (token) => {
  localStorage.setItem('accessToken', token);
};
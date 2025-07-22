import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router'
import { FaCartShopping } from 'react-icons/fa6';
import { IoMdArrowDropdown } from 'react-icons/io';
import logo from '../assets/medimart.png';

// Dummy AuthContext (replace with your real auth logic)
const AuthContext = React.createContext(); // You should replace this with your actual context

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) || {};

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) =>
          isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-600'}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/shop" className={({ isActive }) =>
          isActive ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-600'}>
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart" className="text-gray-700 hover:text-red-600 text-xl">
          <FaCartShopping />
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    if (logout) logout();
  };

  return (
    <div className='bg-base-200 shadow-sm'>
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Left: Logo */}
        <div className="navbar-start">
          <Link to="/" className='flex items-center gap-2'>
            <img className="max-w-[120px]" src={logo} alt="MediMart Logo" />
          </Link>
        </div>

        {/* Center: Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        {/* Right Side: Language | Auth | Profile */}
        <div className="navbar-end flex items-center gap-2">
          {/* Language Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-ghost flex items-center gap-1">
              Language <IoMdArrowDropdown />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
              <li><a>English</a></li>
              <li><a>বাংলা</a></li>
            </ul>
          </div>

          {/* Auth/Profile */}
          {!user ? (
            <>
              <Link to="/login" className="btn btn-sm btn-secondary ml-2">Join Us</Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || 'https://i.ibb.co/2FsfXqM/user.png'} alt="profile" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><Link to="/profile">Update Profile</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile: Nav Drawer */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

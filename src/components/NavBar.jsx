import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import logo from "../assets/medimart.png";
import axios from "axios";
import useAxiosSecure from "./hook/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const {  signOutUser } = useContext(AuthContext) || {};
  const [user,setUser]= useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const axiosSecure=useAxiosSecure()

  console.log(user);
const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:5000/profile", {
      headers: {
        "Content-Type": "application/json", 
        Authorization: token,
      },
    });

    console.log(response);

    const result = response.data;

    if (result.success) {
      setUser(result.data);
    } else {
      setError(result.message || "Failed to fetch user data");
    }
  } catch (err) {
    setError(
      "Error connecting to server: " +
        (err.response?.data?.message || err.message)
    );
    console.error("Axios fetch error:", err);
  }
};

useEffect(() => {
  fetchUser();
}, []);
  console.log(user)
  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-red-600 font-semibold"
            : "text-gray-700 hover:text-red-600"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) =>
          isActive
            ? "text-red-600 font-semibold"
            : "text-gray-700 hover:text-red-600"
        }
      >
        Shop
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive
            ? "text-red-600 font-semibold"
            : "text-gray-700 hover:text-red-600"
        }
      >
        <FaCartShopping className="text-xl" />
      </NavLink>
    </>
  );

  const handleLogout = async () => {
    try {
      await signOutUser();          
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  const handleDashboardClick = () => {
    if (!user) return;

    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "seller":
        navigate("/seller");
        break;
      case "user":
      default:
        navigate("/user");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="MediMart" className="h-10" />
          <span className="text-xl font-bold text-red-600">MediMart</span>
        </div>

        {/* Center: Menu */}
        <div className="hidden md:flex space-x-8 items-center">{navLinks}</div>

        {/* Right Side: Language | Auth | Profile */}
        <div className="flex items-center space-x-6">
          {/* Language Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="flex items-center cursor-pointer">
              <span className="mr-1">Language</span>
              <IoMdArrowDropdown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-white rounded-box w-40"
            >
              <li>
                <a>English</a>
              </li>
              <li>
                <a>বাংলা</a>
              </li>
            </ul>
          </div>

          {/* Auth/Profile */}
          {!user ? (
            <Link
              to="/login"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Join Us
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
              >
                <li>
                  <Link to="/profile">Update Profile</Link>
                </li>
                <li>
                  <button onClick={handleDashboardClick}>Dashboard</button>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile: Nav Drawer */}
        <div className="md:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-4 shadow bg-white rounded-box w-60 space-y-4"
          >
            {navLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

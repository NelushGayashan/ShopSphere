// src/components/Header.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { toast } from 'react-toastify';
import '../tailwind.css';

const Header = () => {
  const user = useSelector((state) => state.auth.user); // Get user state from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State to control the dropdown visibility
  const [cartDropdownVisible, setCartDropdownVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('You have successfully logged out!');
    navigate('/login'); // Redirect to login page
  };

  const handleCartClick = () => {
    if (!user) {
      // If the user is not logged in, show the cart dropdown with a message
      setCartDropdownVisible(true);
      setTimeout(() => {
        // Hide the dropdown after a few seconds
        setCartDropdownVisible(false);
      }, 3000); // Hides after 3 seconds
    } else {
      // If logged in, navigate to cart page
      navigate('/cart');
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-cyan-400 shadow-md fixed top-0 left-0 right-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ShopSphere title */}
          <h1
            className="text-white text-2xl font-bold cursor-pointer"
            onClick={() => navigate('/')}
          >
            ShopSphere
          </h1>

          {/* Navigation buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              className="text-black dark:text-white hover:text-gray-300 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 relative"
              onClick={handleCartClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7H19m-12 0a1 1 0 11-2 0m2 0h10a1 1 0 102 0m-2 0a1 1 0 11-2 0"
                />
              </svg>

              {/* Cart Dropdown */}
              {cartDropdownVisible && !user && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg p-2 z-10">
                  <p className="text-sm">No items in cart. Please log in first.</p>
                </div>
              )}
            </button>

            {/* User Authentication */}
            {user ? (
              <>
                {/* Account Button */}
                <button
                  className="text-black dark:text-white hover:text-gray-300 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                  onClick={() => navigate('/account')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.121 18.364A7.968 7.968 0 0112 16c1.657 0 3.157.472 4.433 1.283M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-400 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="/login"
                  className="text-white dark:text-white hover:text-gray-300 dark:hover:text-gray-400 text-sm font-medium"
                >
                  Login
                </Link>
                {/* Register Button */}
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

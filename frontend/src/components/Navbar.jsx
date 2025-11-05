import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="PrescripWell Logo"
      />

      {/* Desktop Menu */}
      <ul className="md:flex items-start gap-6 font-medium hidden">
        <NavLink
          to="/"
          className="relative group text-gray-700 font-semibold transition-all duration-300"
        >
          <li className="py-1">HOME</li>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#4A6CF7] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>

        <NavLink
          to="/doctors"
          className="relative group text-gray-700 font-semibold transition-all duration-300"
        >
          <li className="py-1">ALL DOCTORS</li>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#4A6CF7] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>

        <NavLink
          to="/about"
          className="relative group text-gray-700 font-semibold transition-all duration-300"
        >
          <li className="py-1">ABOUT</li>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#4A6CF7] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>

        <NavLink
          to="/contact"
          className="relative group text-gray-700 font-semibold transition-all duration-300"
        >
          <li className="py-1">CONTACT</li>
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#4A6CF7] transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
      </ul>

      {/* User / Login Section */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt="User" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4 shadow-md">
                <p
                  onClick={() => navigate('/my-profile')}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/my-appointments')}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-[#4A6CF7] text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-[#3B5CE5] transition-all duration-300"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'
            } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} className="w-36" alt="PrescripWell Logo" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-7 cursor-pointer"
              alt="Close"
            />
          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded-full inline-block hover:text-[#4A6CF7] transition-colors duration-300">
                HOME
              </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded-full inline-block hover:text-[#4A6CF7] transition-colors duration-300">
                ALL DOCTORS
              </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded-full inline-block hover:text-[#4A6CF7] transition-colors duration-300">
                ABOUT
              </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded-full inline-block hover:text-[#4A6CF7] transition-colors duration-300">
                CONTACT
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

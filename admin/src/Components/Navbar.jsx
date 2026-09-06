import React from 'react';
import { FiBell, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="navbar">

      {/* Left - Logo */}
      <div className="nav-left">
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.TWXYdjQIRGSOdvVJq73IXwHaBX&pid=Api&P=0&h=180"
          className="grab-logo"
          alt="Logo"
        />

        <div className="brand">
          <h2>Admin Panel</h2>
          <span>Management System</span>
        </div>
      </div>


      {/* Right - Admin */}
      <div className="nav-right">

        {/* Notification */}
        <button className="notification">
          <FiBell />
          <span className="notification-dot"></span>
        </button>

        {/* Divider */}
        <div className="nav-divider"></div>

        {/* Admin Profile */}
        <div className="profile">

          <img
            src="https://tse1.mm.bing.net/th?id=OIP.HbH3JC3jPiRxqIE9MXi_VQHaJ3&pid=Api&P=0&h=180"
            className="adminimg"
            alt="Admin"
          />

          <div className="profile-info">
            <h4>Admin</h4>
            <span>Administrator</span>
          </div>

          <FiChevronDown className="arrow" />

        </div>

      </div>

    </nav>
  );
};

export default Navbar;

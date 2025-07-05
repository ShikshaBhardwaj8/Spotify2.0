import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <button className="hamburger-btn" onClick={onMenuClick}>
        <FaBars />
      </button>
      <h2>Spotify🎧</h2>

      {user ? (
        <div className="user-info">
          <div className="user-avatar">
            {user.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="username">{user.username}</span>
          <button onClick={handleLogout} className="logout-btn" title="Logout">
            <FaSignOutAlt />
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button className="enjoy-music-btn">Enjoy Music</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React from "react";
import { FaBars, FaBell, FaCommentDots } from "react-icons/fa";
import "../Styles/TopBar.css";
import profilePic from "../Images/user.png";

const TopBar = ({ toggleSidebar }) => {
  return (
    <div className="topbar">
      {/* Ícono de hamburguesa */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Elementos de la derecha */}
      <div className="right-section">
        <FaBell className="icon" />
        <FaCommentDots className="icon" />
        <div className="user-menu">
          <img src={profilePic} alt="Profile" className="user-avatar" />
          <span>Charles Hall</span>
          <div className="dropdown">
            <ul>
              <li>Profile</li>
              <li>Analytics</li>
              <li>Settings & Privacy</li>
              <li>Help Center</li>
              <li>Log out</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

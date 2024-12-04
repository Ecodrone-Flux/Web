import React, { useState } from "react";
import { FaBars, FaBell, FaCommentDots } from "react-icons/fa";
import "../Styles/TopBar.css";
import profilePic from "../Images/user.png";

const TopBar = ({ toggleSidebar }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  return (
    <div className="topbar">
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className="right-section">
        {/* Menú del usuario */}
        <div
          className="user-menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img src={profilePic} alt="Profile" className="user-avatar" />
          <span>Charles Hall</span>

          {isDropdownVisible && (
            <div className="dropdown">
              <ul>
                <li>Profile</li>
                <li>Analytics</li>
                <li>Log out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars} from "react-icons/fa";
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

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

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
          <span>{userName || "User"}</span> {/* Muestra el nombre del usuario */}

          {isDropdownVisible && (
            <div className="dropdown">
              <ul>
                <Link to={`/updateuser/${userId}`} class="text-body text-decoration-none">
                  <li>Profile</li>
                </Link>
                <li onClick={handleLogout}>Log out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;

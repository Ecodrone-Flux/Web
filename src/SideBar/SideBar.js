// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "../Styles/SideBar.css";
import profilePic from "../Images/user.png";
import leafImage from "../Images/leaf.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <h2 className="sidebar-logo">
          ECODRONE <img src={leafImage} alt="leaf" className="logo-icon"/>
        </h2>
      </div>

      {/* Profile Section */}
      <div className="sidebar-profile">
        <img src={profilePic} alt="Profile" className="profile-pic" />
      </div>

      {/* Menu Items */}
      <div className="sidebar-menu">
        <div className="menu-section">
          <div className="menu-title">
            <i className="fas fa-home"></i> Home
          </div>
          <ul>
            <li>
              <Link to="/analytics">Analytics</Link>
            </li>
            <li>
              <Link to="/alerts">Alerts and Notifications</Link>
            </li>
            <li>
              <Link to="/drones">Drones</Link>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <div className="menu-title">
            <i className="fas fa-user"></i> Users
          </div>
          <ul>
            <li>
              <Link to="/new-user">New User</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout */}
      <div className="sidebar-logout">
        <button className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

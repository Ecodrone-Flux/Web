// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "../Styles/SideBar.css";
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

      {/* Menu Items */}
      <div className="sidebar-menu">
        <div className="menu-section">
          <div className="menu-title">
            <i className="fas fa-home"></i> Analytics
          </div>
          <ul>
            <li>
              <Link to="/deforestationmap">Deforestation Map</Link>
            </li>
            <li>
              <Link to="/reforestation">Reforestation Suggestions</Link>
            </li>
            <li>
              <Link to="/riskAnalysis">Risk Analysis</Link>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <div className="menu-title">
            <i className="fas fa-home"></i> Alerts
          </div>
          <ul>
            <li>
              <Link to="/alerts">Alerts and Notifications</Link>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <div className="menu-title">
            <i className="fas fa-home"></i> Drones
          </div>
          <ul>
            <li>
              <Link to="/addDrone">Add Drone</Link>
            </li>
          </ul>
        </div>

        <div className="menu-section">
          <div className="menu-title">
            <i className="fas fa-user"></i> Users
          </div>
          <ul>
            <li>
              <Link to="/register">New User</Link>
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

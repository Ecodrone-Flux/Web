import React, { useState } from "react";
import Sidebar from "./SideBar.js";
import TopBar from "./TopBar.js";
import "../Styles/Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout d-flex">
      {isSidebarOpen && <Sidebar />}
      <div className={`main-container flex-grow-1 ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <TopBar toggleSidebar={toggleSidebar} />
        <main className="content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

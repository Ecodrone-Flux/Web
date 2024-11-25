// src/components/Layout.js
import React from "react";
import Sidebar from "./SideBar.js";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout;

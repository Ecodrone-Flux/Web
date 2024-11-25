import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./SideBar/Layout";
import Splash from "./Administrator/Splash";
import Login from "./Administrator/Login";
import Register from "./Administrator/Users/Register";
import Users from "./Administrator/Users/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Layout> <Register /> </Layout>}/>
        <Route path="/users" element={<Layout> <Register /> </Layout>}/>
      </Routes>
    </Router>
  );
}

export default App;

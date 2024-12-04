import React from "react";
import { GoogleMapsProvider } from "./Components/GoogleMapsContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./SideBar/Layout";
import Splash from "./Administrator/Splash";
import Login from "./Administrator/Login";
import Home from "./Administrator/Home";

import Register from "./Administrator/Users/Register";
import Users from "./Administrator/Users/Users";
import UpdateUser from "./Administrator/Users/UpdateUser";

import Alerts from "./Administrator/Alerts/Alerts";
import AlertDetail from "./Administrator/Alerts/AlertDetail";

import DeforestationMap from "./Administrator/Analytics/DeforestationMap";
import ReforestationSuggestions from "./Administrator/Analytics/ReforestationSuggestions";
import RiskAnalysis from "./Administrator/Analytics/RiskAnalysis";

import Drones from "./Administrator/Drones/Drones";

function App() {
  return (
    <GoogleMapsProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Layout> <Home /> </Layout>}/>

        <Route path="/register" element={<Layout> <Register /> </Layout>}/>
        <Route path="/users" element={<Layout> <Users /> </Layout>}/>
        <Route path="/updateuser/:id" element={<Layout> <UpdateUser /> </Layout>}/>

        <Route path="/alerts" element={<Layout> <Alerts /> </Layout>}/>
        <Route path="/alertdetail" element={<Layout> <AlertDetail /> </Layout>}/>

        <Route path="/deforestationmap" element={<Layout> <DeforestationMap /> </Layout>}/>
        <Route path="/reforestation" element={<Layout> <ReforestationSuggestions /> </Layout>}/>
        <Route path="/riskAnalysis" element={<Layout> <RiskAnalysis /> </Layout>}/>

        <Route path="/drones" element={<Layout> <Drones /> </Layout>}/>
        
      </Routes>
    </Router>
    </GoogleMapsProvider>
  );
}

export default App;

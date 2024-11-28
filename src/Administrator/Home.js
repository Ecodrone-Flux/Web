import React from "react";
import "../Styles/App.css";
import ChartDashboard from "../Components/ChartDashboard";
import WorldMap from "../Components/MapComponent";

function Home() {
  return (
    <div className="container py-3 mx-5">
      <h1 className="mb-4 text-align-start">Home</h1>
      <ChartDashboard />
      <WorldMap />
    </div>
  );
}

export default Home;

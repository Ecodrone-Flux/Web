import React from "react";
import "../../Styles/App.css";
import WorldMap from "../../Components/WorldMapComponent";

function FireSpots() {
  return (
    <div className="container py-3 mx-5">
      <h1 className="mb-4 text-align-start">Fire Spots</h1>
        <WorldMap />
    </div>
  );
}

export default FireSpots;
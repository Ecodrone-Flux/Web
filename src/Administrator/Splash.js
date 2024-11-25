import React from "react";
import "../Styles/App.css";
import { Link } from "react-router-dom";
import leafImage from "../Images/leaf.png";

function Splash() {
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-between bg-green">
      {/* Header con el botón de login */}
      <header className="d-flex justify-content-end px-5 m-5">
        <Link to="/login">
          <button className="btn btn-dark btn-lg px-5" style={{ fontSize: "1.5rem" }}>Log In</button>
        </Link>
      </header>

      {/* Contenido principal */}
      <main className="d-flex flex-column align-items-center text-center flex-grow-1" >
        <h3 className="fw-bold mt-5">WELCOME TO</h3>
        <div className="d-flex align-items-center my-3">
          <h1 className="fw-bold display-1" >ECODRONE</h1>
          <img src={leafImage} alt="Ecodrone" className="img-fluid" style={{ maxWidth: "130px" }}/>
        </div>
        <h3 className="fw-bold text-end">BY FLUX</h3>
      </main>
    </div>
  );
}

export default Splash;

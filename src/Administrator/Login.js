import React from "react";
import "../Styles/App.css";
import droneImage from "../Images/drone.png";
import leafImage from "../Images/leaf.png";

function Login() {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-green">
      <div className="row w-100">
        {/* Sección izquierda: Formulario */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
          <div className="d-flex align-items-center">
            <h1 className="display-4 fw-bold">ECODRONE</h1>
            <img src={leafImage} alt="Ecodrone" className="img-fluid" style={{ maxWidth: "100px" }}/>
          </div>
          <form className="w-75 mt-4">
            <div className="mb-3">
              <input type="text" className="form-control custom-input" placeholder="Email"/>
            </div>
            <div className="mb-3">
              <input type="password" className="form-control custom-input" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-dark custom-btn"> Log In </button>
          </form>
          <p className="mt-3">
            Don't have an account? <a href="/register" className="fw-bold text-dark">Sign up here.</a>
          </p>
        </div>

        {/* Sección derecha: Imagen */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <img 
              src={droneImage} 
              alt="Ecodrone" 
              className="img-fluid" 
              style={{ maxWidth: "500px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

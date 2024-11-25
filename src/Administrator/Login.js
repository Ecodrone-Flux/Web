import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../Styles/App.css";
import droneImage from "../Images/drone.png";
import leafImage from "../Images/leaf.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  
  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Validación básica de los campos
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      // Realizar la solicitud de login
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate("/home"); 
      } else {
        // Si ocurre un error, mostrar el mensaje de error
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center bg-green">
      <div className="row w-100">
        {/* Sección izquierda: Formulario */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
          <div className="d-flex align-items-center">
            <h1 className="display-4 fw-bold">ECODRONE</h1>
            <img src={leafImage} alt="Ecodrone" className="img-fluid" style={{ maxWidth: "100px" }} />
          </div>
          <form className="w-75 mt-4" onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control custom-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control custom-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Mostrar mensaje de error */}
            <button type="submit" className="btn btn-dark custom-btn">
              Log In
            </button>
          </form>
          <p className="mt-3">
            Don't have an account? <a href="/register" className="fw-bold text-dark">Sign up here.</a>
          </p>
        </div>

        {/* Sección derecha: Imagen */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <img src={droneImage} alt="Ecodrone" className="img-fluid" style={{ maxWidth: "500px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

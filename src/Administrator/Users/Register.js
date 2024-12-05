import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "../../Components/GoogleMapsContext"; 
import CustomModal from "../../Components/CustomModal";

function Register() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("Loading...");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { isLoaded } = useGoogleMaps(); 
  const navigate = useNavigate();

  // Estado para el modal
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    // Verificar si geolocalización está disponible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current position:", { latitude, longitude });
          setLatitude(latitude);
          setLongitude(longitude);
          fetchAddress(latitude, longitude); // Obtener la dirección con las coordenadas
        },
        (error) => {
          console.error("Error getting location: ", error);
          setAddress("Unable to fetch location");
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);
  
  // Función para obtener la dirección basada en latitud y longitud
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA-dqS5UsYWq-v-iwMTlqUsqh7sAFjgSs8`
      );
      const data = await response.json();
      console.log("Geocoding API Response:", data); // Log para depuración
      if (data.results && data.results[0]) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };
  
  // Manejar doble clic en el mapa para actualizar la ubicación y dirección
  const handleMapDblClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    console.log("New coordinates:", { lat: newLat, lng: newLng });
    setLatitude(newLat);
    setLongitude(newLng);
    fetchAddress(newLat, newLng); // Actualizar dirección con las nuevas coordenadas
  };
  
  const registerUser = async () => {
    if (!name || !email || !password || password !== confirmPassword) {
      alert("Please complete all fields correctly");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber,
          latitude,
          longitude,
          lastname,
          address
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // Mostrar el modal de éxito
        setModalTitle("Success");
        setModalMessage(`User ${data.name} registered successfully`);
        setModalShow(true);

        // Limpiar los campos después del registro exitoso
        setName("");
        setLastName("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("Loading...");
        setLatitude("");
        setLongitude("");
  
        // Navegar a la página de usuarios
        navigate("/Users");
      } else {
        alert(data.message || "An error occurred during registration");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="container py-3 mx-5">
      <h1 className="mb-4 text-align-start">Register User</h1>
      <div className="row">
        {/* Datos personales */}
        <div className="col-md-4">
          <h3>Personal Data</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Address"
            value={address}
            readOnly
          />
        </div>
        {/* Mapa */}
        <div className="col-md-7 ms-5">
          <h3>Address</h3>
          <GoogleMap
            center={{ lat: latitude, lng: longitude }}
            zoom={14}
            mapContainerStyle={{ width: "100%", height: "360px", borderRadius: "8px" }}
            onDblClick={handleMapDblClick}
          >
            <Marker position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-center align-items-center gap-2 col-9 mx-auto">
        <button className="btn btn-success w-50" onClick={registerUser}>
          Register
        </button>
        <button className="btn btn-secondary w-50" onClick={() => navigate("/Users")}>
          Cancel
        </button>
      </div>

      {/* Mostrar el modal de éxito */}
      <CustomModal
        show={modalShow}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalShow(false)} // Cerrar el modal
      />
    </div>
  );
}

export default Register;

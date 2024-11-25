import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("Loading...");
  const [latitude, setLatitude] = useState(-34.603722); // Coordenadas iniciales (Buenos Aires)
  const [longitude, setLongitude] = useState(-58.381592);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA-dqS5UsYWq-v-iwMTlqUsqh7sAFjgSs8", // Reemplaza con tu clave
  });

  // Obtener la ubicación del usuario al cargar el componente
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        fetchAddress(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location: ", error);
        setAddress("Unable to fetch location");
      }
    );
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
    console.log("New coordinates:", { lat: newLat, lng: newLng }); // Depurar coordenadas
    setLatitude(newLat);
    setLongitude(newLng);
    fetchAddress(newLat, newLng); // Actualizar dirección con las nuevas coordenadas
  };
  

  const registerUser = async () => {
    if (!name || !email || !password || password !== confirmPassword) {
      alert("Please complete all fields correctly");
      return;
    }

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        lastName,
        phoneNumber,
        email,
        password,
        address,
        latitude,
        longitude,
      }),
    });

    const data = await response.json();
    alert(`User ${data.name} registered successfully`);
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
            value={lastName}
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
            onDblClick={handleMapDblClick} // Manejar doble clic en el mapa
          >
            <Marker position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <button className="btn btn-success w-50" onClick={registerUser}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;

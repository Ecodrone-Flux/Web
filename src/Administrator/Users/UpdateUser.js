import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "../../Components/GoogleMapsContext";

function UpdateUser() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("Loading...");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { isLoaded } = useGoogleMaps();
  const navigate = useNavigate();
  
  // Obtén el ID del usuario desde el URL
  const { id } = useParams();  // Usamos useParams para obtener el id de la URL

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`); // Usa el id desde useParams
        const data = await response.json();
        console.log(data); // Para verificar los datos que se reciben

        if (response.ok) {
          setName(data.name || "");
          setLastName(data.lastname || "");
          setPhoneNumber(data.phonenumber || "");
          setEmail(data.email || "");
          setAddress(data.address || "No address found");
          setLatitude(data.latitude || "");
          setLongitude(data.longitude || "");
        } else {
          alert("Error fetching user data: " + data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data");
      }
    };

    fetchUserData();
  }, [id]); // El hook se ejecutará nuevamente si cambia el id

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA-dqS5UsYWq-v-iwMTlqUsqh7sAFjgSs8`
      );
      const data = await response.json();
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

  const handleMapDblClick = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setLatitude(newLat);
    setLongitude(newLng);
    fetchAddress(newLat, newLng);
  };

  const updateUser = async () => {
    if (!name || !email) {
      alert("Please complete all fields correctly");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phoneNumber,
          latitude,
          longitude,
          lastname,
          address
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`User ${data.name} updated successfully`);
        navigate("/Users");
      } else {
        alert(data.message || "An error occurred during update");
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="container py-3 mx-5">
      <h1 className="mb-4 text-align-start">Update User</h1>
      <div className="row">
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
            type="text"
            className="form-control mb-3"
            placeholder="Address"
            value={address}
            readOnly
          />
        </div>
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
        <button className="btn btn-success w-50" onClick={updateUser}>
          Update
        </button>
        <button className="btn btn-secondary w-50" onClick={() => navigate("/Users")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UpdateUser;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "../../Styles/App.css";

function AlertDetail() {
  const [alertData, setAlertData] = useState(null);
  const [userName, setUserName] = useState(""); // Nuevo estado para el nombre del usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long', // Día de la semana
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    });
  };

  // Fetch de los datos de alerta
  useEffect(() => {
    const fetchAlertData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/alert/${id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching alert data");
        }
        const data = await response.json();
        setAlertData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching alert data:", err.message);
        setError("Failed to load alert details.");
        setLoading(false);
      }
    };

    fetchAlertData();
  }, [id]);

  // Fetch del nombre de usuario
  useEffect(() => {
    if (alertData?.userid) {
      const fetchUserName = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/${alertData.userid}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error("Error fetching user data");
          }
          const userData = await response.json();
          setUserName(userData.name || "Unknown User"); // Asigna el nombre o un valor por defecto
        } catch (err) {
          console.error("Error fetching user data:", err.message);
          setUserName("Error fetching user name");
        }
      };

      fetchUserName();
    }
  }, [alertData?.userid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container py-3 mx-5">
      <h1 className="mb-4 text-align-start">Alert and Notifications</h1>

      {/* Contenedor principal */}
      <div className="row">
        <div className="col-md-3">
          {/* Detalles */}
          <h4>Details</h4>
          <div className="details-container p-3 mb-3 rounded shadow-sm">
            <p>
              <strong>User:</strong> {userName} {/* Muestra el nombre del usuario */}
            </p>
            <p>
              <strong>Alert Type:</strong> {alertData.alerttype}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(alertData.date)}
            </p>
            <p>
              <strong>Description:</strong> {alertData.description}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="mt-4 d-flex justify-content-between">
            <button className="btn btn-primary btn-lg">Archive Alert</button>
            <button className="btn btn-danger btn-lg">Send Drone</button>
          </div>
        </div>

        {/* Imagen */}
        <div className="col-md-4">
          <h4>Image</h4>
          <img
            src={
              alertData.images ||
              "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt="Alert Image"
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* Mapa */}
        <div className="col-md-4">
          <h3>Address</h3>
          <GoogleMap
            center={{ lat: alertData.latitude, lng: alertData.longitude }}
            zoom={14}
            mapContainerStyle={{
              width: "100%",
              height: "360px",
              borderRadius: "8px",
            }}
          >
            <Marker
              position={{ lat: alertData.latitude, lng: alertData.longitude }}
            />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default AlertDetail;

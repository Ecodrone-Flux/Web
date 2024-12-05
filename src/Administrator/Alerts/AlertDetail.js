import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Modal, Button, Form } from "react-bootstrap";
import "../../Styles/App.css";

function AlertDetail() {
  const [alertData, setAlertData] = useState(null);
  const [userName, setUserName] = useState(""); // Nuevo estado para el nombre del usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [drones, setDrones] = useState([]); // Estado para almacenar los drones disponibles
  const [selectedDrone, setSelectedDrone] = useState(""); // Estado para almacenar el drone seleccionado

  const { id } = useParams();

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "long", // Day of the week
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
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

  // Fetch de los drones disponibles
  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/drones`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching drones");
        }
        const data = await response.json();
        setDrones(data);
      } catch (err) {
        console.error("Error fetching drones:", err.message);
      }
    };

    fetchDrones();
  }, []);

  // Función para enviar el drone
  const handleSendDrone = () => {
    if (selectedDrone) {
      // Lógica para enviar el drone
      alert(`Drone with ID: ${selectedDrone} has been sent`);
      setShowModal(false);
    } else {
      alert("Please select a drone.");
    }
  };

  // Mostrar la ventana de modal
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
              <strong>User:</strong> {userName}
            </p>
            <p>
              <strong>Alert Type:</strong> {alertData.alerttype}
            </p>
            <p>
              <strong>Date:</strong> {formatDate(alertData.date)} {/* Mostrar la fecha formateada */}
            </p>
            <p>
              <strong>Description:</strong> {alertData.description}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="mt-4 d-flex justify-content-between">
            <button className="btn btn-primary btn-lg">Archive Alert</button>
            <button className="btn btn-danger btn-lg" onClick={handleShow}>
              Send Drone
            </button>
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

      {/* Modal para enviar drone */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Drone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="selectDrone">
              <Form.Label>Select Drone</Form.Label>
              <Form.Control
                as="select"
                value={selectedDrone}
                onChange={(e) => setSelectedDrone(e.target.value)}
              >
                <option value="">Select a drone</option>
                {drones.map((drone) => (
                  <option key={drone.id} value={drone.id}>
                    {drone.model}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendDrone}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AlertDetail;

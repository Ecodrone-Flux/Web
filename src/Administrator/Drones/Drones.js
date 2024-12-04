import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import '../../Styles/App.css';

function Drones() {
  const [drones, setDrones] = useState([]);
  const [showCreateDroneModal, setShowCreateDroneModal] = useState(false); 
  const [newDroneModel, setNewDroneModel] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [droneToDelete, setDroneToDelete] = useState(null);
  const [editingDroneId, setEditingDroneId] = useState(null);
  const [newModel, setNewModel] = useState('');

  // Fetch drones
  useEffect(() => {
    const fetchDrones = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/drones`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Error fetching drones");
        }
        const data = await response.json();
        setDrones(data);
      } catch (error) {
        console.error("Error fetching drones:", error);
      }
    };

    fetchDrones();
  }, []);

  // Handle name editing
  const handleEditNameClick = (droneId, currentName) => {
    setEditingDroneId(droneId);
    setNewModel(currentName);
  };

  const handleSaveName = async (droneId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/drones/${droneId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: newModel }),
      });

      if (!response.ok) {
        throw new Error("Error saving drone model");
      }

      setDrones(drones.map(drone => 
        drone.id === droneId ? { ...drone, model: newModel } : drone
      ));
      setEditingDroneId(null);
      setNewModel('');
    } catch (error) {
      console.error("Error saving drone model:", error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingDroneId(null);
    setNewModel('');
  };

  // Handler for showing the delete modal
  const handleDeleteClick = (droneId) => {
    setDroneToDelete(droneId);
    setShowDeleteModal(true);
  };

  // Confirm the deletion
  const confirmDelete = async () => {
    if (droneToDelete) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/drones/${droneToDelete}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Not Available" }),  // Cambiar el estado
        });

        if (!response.ok) {
          throw new Error("Error deleting drone");
        }

        setDrones(drones.filter(drone => drone.id !== droneToDelete));
        setShowDeleteModal(false);
        setDroneToDelete(null);
      } catch (error) {
        console.error("Error deleting drone:", error);
      }
    }
  };

  // Open modal for creating a new drone
  const handleCreateDroneClick = () => {
    setShowCreateDroneModal(true);
  };

  // Close modal
  const handleCloseCreateDroneModal = () => {
    setShowCreateDroneModal(false);
    setNewDroneModel('');
  };

  // Create a new drone
  const handleCreateDrone = async () => {
    const newDrone = { model: newDroneModel };
    console.log("Creating drone with model:", newDrone.model);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/drones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDrone),
      });
  
      if (!response.ok) {
        throw new Error("Error creating drone");
      }
  
      const createdDrone = await response.json();
      setDrones([...drones, createdDrone]);
      handleCloseCreateDroneModal();
    } catch (error) {
      console.error("Error creating drone:", error);
    }
  };
  

  return (
    <div className="container py-3 mx-5">
      <h1 className="mb-4">Drone Data</h1>
      <button className="btn btn-success mb-4" onClick={handleCreateDroneClick}>
        Create Drone
      </button>

      {/* Modal de creación de drone */}
      <Modal show={showCreateDroneModal} onHide={handleCloseCreateDroneModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Drone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter drone model"
                value={newDroneModel}
                onChange={(e) => setNewDroneModel(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateDroneModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateDrone}>
            Create Drone
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        {drones.map((drone) => (
          <div className="col-md-3 mb-3" key={drone.id}>
            <div className="card shadow-sm">
              <div className="card-body text-center">
                {editingDroneId === drone.id ? (
                  <>
                    <input
                      type="text"
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      className="form-control"
                    />
                    <div className="mt-2">
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleSaveName(drone.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">{drone.model}</h5>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditNameClick(drone.id, drone.model)}
                    >
                      Edit Model
                    </button>
                  </>
                )}
                <p className="card-text">{drone.status}</p>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDeleteClick(drone.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmación */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to eliminate this drone?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Drones;

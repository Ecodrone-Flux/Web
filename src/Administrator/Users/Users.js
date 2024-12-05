import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import '../../Styles/App.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const loggedInUserName = localStorage.getItem("userName"); // Obtiene el nombre del usuario logueado

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Error fetching users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handler for showing the delete modal
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  // Confirm the deletion
  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userToDelete}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: 0 }),
        });

        if (!response.ok) {
          throw new Error("Error deleting user");
        }

        setUsers(users.filter(user => user.id !== userToDelete));

        setShowDeleteModal(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="container py-3 mx-5">
      <h1 className="mb-4">Personal Data</h1>
      <div className="row">
        {users
          .filter((user) => user.name !== loggedInUserName) // Filtrar usuarios por nombre
          .map((user) => (
            <div className="col-md-3 mb-3" key={user.id}>
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">{`${user.name} ${user.lastname}`}</h5>
                  <p className="card-text">{user.address}</p>
                  <p className="card-text text-muted">{user.email}</p>
                  <Link to={`/updateuser/${user.id}`}>
                    <button className="btn btn-warning">Edit</button>
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDeleteClick(user.id)}
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
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres eliminar este usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;

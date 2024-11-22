import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/App.css';

import { addUser, getUsers } from '../FirebaseMethods/Users';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddUser = async () => {
    const result = await addUser(
      "Juan Perez", 
      "juan@gmail.com", 
      "pass1234", 
      40.7128, 
      -74.0060
    );

    if (result.success) {
      alert("Usuario agregado exitosamente");
      // Aquí no se necesita `result.id`, ya que el ID es implícito (se basa en el email o alguna clave única).
      setUsers(prevUsers => [
        ...prevUsers,
        { name: "Juan Perez", email: "juan@gmail.com" }
      ]);
    } else {
      console.error("Error al agregar usuario:", result.error);
      alert(`Error al agregar el usuario: ${result.error.message || "Error desconocido"}`);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Muestra que la carga está en progreso
      const usersData = await getUsers();
      if (usersData.success) {
        setUsers(usersData.data); // Ahora directamente trabajas con los usuarios
      } else {
        console.error("Error al obtener usuarios:", usersData.error);
        alert("Error al cargar la lista de usuarios.");
      }
      setLoading(false); // Finaliza la carga
    };

    fetchUsers();
  }, []);

  return (
    <div className="App bg-black">
      <div className="d-flex justify-content-center p-4">
        <div className="d-flex justify-content-center">
          <p className="text-start mx-3 fs-4">ECODRONE</p>
        </div>
      </div>

      <header className="App-header">
        <div className="d-flex justify-content-center">
          <button onClick={handleAddUser} className="btn btn-primary">
            Registrar Usuario
          </button>
        </div>

        <div className="d-flex justify-content-center">
          {loading ? (
            <p>Cargando usuarios...</p>
          ) : (
            <ul>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <li key={index}>
                    {user.name} - {user.email}
                  </li>
                ))
              ) : (
                <p>No hay usuarios registrados.</p>
              )}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default Home;

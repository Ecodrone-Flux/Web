import React, { useEffect, useState } from "react";
import '../../Styles/App.css'

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users", {
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

  return (
    <div className="container py-3 mx-5">
      <h1 className="mb-4">Users List</h1>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-3" key={user.id}>
            <div className="card shadow-sm">
              <img
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                className="card-img-top"
                style={{ objectFit: "cover", height: "150px" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{`${user.name} ${user.lastname}`}</h5>
                <p className="card-text">{user.address}</p>
                <p className="card-text text-muted">{user.email}</p>
                <button className="btn btn-warning">Edit User</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;

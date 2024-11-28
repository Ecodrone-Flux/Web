import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
import "../../Styles/App.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/alerts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Error fetching alerts");
        }
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="container py-3 mx-5">
      <h1 className="mb-4 text-align-start">Alerts</h1>
      <div className="row">
        {alerts.map((alert) => (
          <div className="col-md-3 mb-3" key={alert.id}>
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{`Alert type: ${alert.alerttype}`}</h5>
                <p className="card-text">
                  {format(new Date(alert.date), 'MM/dd/yyyy HH:mm')}
                </p>
                <p className="card-text text-muted">{alert.status}</p>
                <Link to="/alertdetail"><button className="btn btn-warning">See More</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
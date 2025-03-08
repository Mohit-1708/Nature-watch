import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GaugeMeter from "./GaugeMeter";
import "../styles/Dashboard.css"; // Add a separate CSS file for better styling

const Dashboard = () => {
  const { treeId } = useParams();
  const [temperature, setTemperature] = useState(30);
  const [humidity, setHumidity] = useState(60);

  // Function to update sensor values randomly (simulating real-time data)
  useEffect(() => {
    const updateSensorData = () => {
      setTemperature(parseFloat((20 + Math.random() * 15).toFixed(1))); // Rounded to 1 decimal place
      setHumidity(parseFloat((40 + Math.random() * 30).toFixed(1))); // Rounded to 1 decimal place
    };

    const interval = setInterval(updateSensorData, 5000); // Updates every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Tree {treeId} - Sensor Data</h2>

      <div className="gauge-container">
        <GaugeMeter title="Temperature" value={temperature} unit="°C" min={0} max={50} />
        <GaugeMeter title="Humidity" value={humidity} unit="%" min={0} max={100} />
      </div>
    </div>
  );
};

export default Dashboard;

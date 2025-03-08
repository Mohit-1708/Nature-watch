import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GaugeMeter from "./GaugeMeter";
import { database, ref, onValue } from "../firebaseConfig";
import "../styles/Dashboard.css";  // Ensure you have a CSS file for styling

const Dashboard = () => {
  const { areaId, treeId } = useParams();
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!areaId || !treeId) return;

    const sensorRef = ref(database, `areas/${areaId}/trees/${treeId}/sensors`);

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        setSensorData(snapshot.val());
      } else {
        setSensorData({
          temperature: "N/A",
          humidity: "N/A",
          aqi: "N/A",
          gyroscopeChange: false,
        });
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [areaId, treeId]);

  if (loading) {
    return <h2>Loading sensor data...</h2>;
  }

  return (
    <div className="dashboard">
      <h2>Tree {treeId} in Area {areaId} - Sensor Data</h2>
      <div className="gauge-container">
        <GaugeMeter title="Temperature (°C)" value={sensorData?.temperature ?? "N/A"} />
        <GaugeMeter title="Humidity (%)" value={sensorData?.humidity ?? "N/A"} />
        <GaugeMeter title="AQI" value={sensorData?.aqi ?? "N/A"} />
      </div>
      {sensorData?.gyroscopeChange && <p className="alert-message">⚠️ Gyroscope Alert Detected!</p>}
    </div>
  );
};

export default Dashboard;

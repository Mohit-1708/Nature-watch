import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database, ref, onValue } from "../firebaseConfig";
import "../styles/AreaSelection.css";

const AreaSelection = () => {
  const navigate = useNavigate();
  const [areaAlerts, setAreaAlerts] = useState({});
  const [webAlert, setWebAlert] = useState(null);

  useEffect(() => {
    const areasRef = ref(database, "areas");

    // Listen for changes in Firebase
    const unsubscribe = onValue(areasRef, (snapshot) => {
      if (snapshot.exists()) {
        const alerts = {};
        let anyAreaAlert = false;
        let alertAreaName = "";

        snapshot.forEach((areaSnapshot) => {
          const areaId = areaSnapshot.key;
          let hasAlert = false;

          // Loop through trees in each area
          areaSnapshot.child("trees").forEach((treeSnapshot) => {
            const treeData = treeSnapshot.val().sensors;
            if (treeData && (treeData.gyroscopeChange || treeData.firedetector)) {
              hasAlert = true;
            }
          });

          alerts[areaId] = hasAlert;

          if (hasAlert) {
            anyAreaAlert = true;
            alertAreaName = `Area ${areaId}`;
          }
        });

        setAreaAlerts(alerts);

        // Show Web Alert if an area turns red
        if (anyAreaAlert) {
          setWebAlert(`🚨 ALERT: ${alertAreaName} has trees with issues!`);

          // Browser Notification (Optional)
          if (Notification.permission === "granted") {
            new Notification("🔥 Area Alert!", {
              body: `${alertAreaName} has trees with issues!`,
              icon: "/alert-icon.png", // Replace with actual icon
            });
          }
        } else {
          setWebAlert(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Request Notification Permission (only once)
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const areas = [
    { id: "1", name: "Area 1" },
    { id: "2", name: "Area 2" },
    { id: "3", name: "Area 3" },
    { id: "4", name: "Area 4" },
  ];

  return (
    <div className="area-selection">
      <h2 id="Title">Select an Area</h2>

      {webAlert && <div className="web-alert">{webAlert}</div>}

      <div className="area-grid">
        {areas.map((area) => (
          <div 
            key={area.id} 
            className={`area-card ${areaAlerts[area.id] ? "alert" : ""}`} 
            onClick={() => navigate(`/tree-selection/${area.id}`)}
          >
            <span>{area.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaSelection;

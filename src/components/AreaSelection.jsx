import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { database, ref, onValue } from "../firebaseConfig";
import "../styles/AreaSelection.css";

const AreaSelection = () => {
  const navigate = useNavigate();
  const [areaAlerts, setAreaAlerts] = useState({});

  useEffect(() => {
    const areasRef = ref(database, "areas");

    // Listen for changes in Firebase
    onValue(areasRef, (snapshot) => {
      if (snapshot.exists()) {
        const alerts = {};
        
        snapshot.forEach((areaSnapshot) => {
          const areaId = areaSnapshot.key; // Get area ID
          let hasAlert = false;

          // Loop through trees in each area
          areaSnapshot.child("trees").forEach((treeSnapshot) => {
            const treeData = treeSnapshot.val().sensors;
            if (treeData && treeData.gyroscopeChange) {
              hasAlert = true;
            }
          });

          alerts[areaId] = hasAlert;
        });

        setAreaAlerts(alerts);
      }
    });

    return () => {}; // Cleanup function (optional)
  }, []); // Run only once

  const areas = [
    { id: "1", name: "Area 1" },
    { id: "2", name: "Area 2" },
    { id: "3", name: "Area 3" },
    { id: "4", name: "Area 4" },
  ];

  return (
    <div className="area-selection">
      <h2 id="Title">Select an Area</h2>
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

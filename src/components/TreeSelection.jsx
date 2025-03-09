import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TreeButton from "./TreeButton";
import { database, ref, onValue } from "../firebaseConfig";
import "../styles/TreeSelection.css";

const TreeSelection = ({ onAreaAlert }) => {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const [treeAlerts, setTreeAlerts] = useState({});
  const [treeData, setTreeData] = useState({});
  const [webAlert, setWebAlert] = useState(null);

  useEffect(() => {
    if (!areaId) return;

    const treesRef = ref(database, `areas/${areaId}/trees`);

    const unsubscribe = onValue(treesRef, (snapshot) => {
      if (snapshot.exists()) {
        const alerts = {};
        const data = {};
        let anyTreeAlert = false;
        let alertTreeName = "";

        snapshot.forEach((treeSnapshot) => {
          const treeId = treeSnapshot.key;
          const sensors = treeSnapshot.child("sensors").val();

          if (sensors) {
            const isTreeAlert = sensors.gyroscopeChange || sensors.firedetector || false;
            alerts[treeId] = isTreeAlert;
            data[treeId] = {
              temperature: sensors.temperature || "N/A",
              humidity: sensors.humidity || "N/A",
              aqi: sensors.aqi || "N/A",
              gyroscopeChange: sensors.gyroscopeChange || false,
              firedetector: sensors.firedetector || false,
            };

            if (isTreeAlert) {
              anyTreeAlert = true;
              alertTreeName = `Tree ${treeId}`; // Capture tree name for alert
            }
          }
        });

        setTreeAlerts(alerts);
        setTreeData(data);

        // Notify AreaSelection if any tree has an alert
        if (onAreaAlert) {
          onAreaAlert(areaId, anyTreeAlert);
        }

        // Show Web Alert if a tree turns red
        if (anyTreeAlert) {
          setWebAlert(`🚨 ALERT: ${alertTreeName} detected an issue!`);

          // Browser Notification (Optional)
          if (Notification.permission === "granted") {
            new Notification("🔥 Tree Alert!", {
              body: `${alertTreeName} detected an issue!`,
              icon: "/alert-icon.png", // Optional: Replace with an actual icon
            });
          }
        } else {
          setWebAlert(null);
        }
      }
    });

    return () => unsubscribe();
  }, [areaId, onAreaAlert]);

  // Request Notification Permission (only once)
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const trees = Array.from({ length: 20 }, (_, i) => ({ id: (i + 1).toString(), name: `Tree ${i + 1}` }));

  return (
    <div className="tree-selection">
      <h2 id="Title">Select a Tree</h2>

      {webAlert && <div className="web-alert">{webAlert}</div>}

      <div className="tree-grid">
        {trees.map((tree) => (
          <TreeButton
            key={tree.id}
            tree={tree}
            onClick={() => navigate(`/dashboard/${areaId}/${tree.id}`, { state: { sensors: treeData[tree.id] || {} } })}
            isAlert={treeAlerts[tree.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeSelection;

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

  useEffect(() => {
    if (!areaId) return;

    const treesRef = ref(database, `areas/${areaId}/trees`);

    onValue(treesRef, (snapshot) => {
      if (snapshot.exists()) {
        const alerts = {};
        const data = {};
        let anyTreeAlert = false;

        snapshot.forEach((treeSnapshot) => {
          const treeId = treeSnapshot.key;
          const sensors = treeSnapshot.child("sensors").val();

          if (sensors) {
            alerts[treeId] = sensors.gyroscopeChange || false;
            data[treeId] = {
              temperature: sensors.temperature || "N/A",
              humidity: sensors.humidity || "N/A",
              aqi: sensors.aqi || "N/A",
              gyroscopeChange: sensors.gyroscopeChange || false,
            };

            if (sensors.gyroscopeChange) {
              anyTreeAlert = true;
            }
          }
        });

        setTreeAlerts(alerts);
        setTreeData(data);

        // Notify AreaSelection if any tree has an alert
        if (onAreaAlert) {
          onAreaAlert(areaId, anyTreeAlert);
        }
      }
    });

  }, [areaId, onAreaAlert]);

  const trees = Array.from({ length: 20 }, (_, i) => ({ id: (i + 1).toString(), name: `Tree ${i + 1}` }));

  return (
    <div className="tree-selection">
      <h2 id="Title">Select a Tree</h2>
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

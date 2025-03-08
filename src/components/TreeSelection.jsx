import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TreeButton from "./TreeButton";
import "../styles/TreeSelection.css";

const TreeSelection = () => {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const trees = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `Tree ${i + 1}` }));

  // State to track alerts for each tree
  const [treeAlerts, setTreeAlerts] = useState({});

  useEffect(() => {
    const handleGyroscopeChange = () => {
      const updatedAlerts = {};
      trees.forEach((tree) => {
        updatedAlerts[tree.id] = Math.random() < 0.3; // 30% chance to be red
      });
      setTreeAlerts(updatedAlerts);
    };

    const interval = setInterval(handleGyroscopeChange, 5000);
    return () => clearInterval(interval);
  }, [trees]);

  return (
    <div className="tree-selection">
      <h2 id="Title">Select a Tree</h2>
      <div className="tree-grid">
        {trees.map((tree) => (
          <TreeButton key={tree.id} tree={tree} onClick={(id) => navigate(`/dashboard/${id}`)} isAlert={treeAlerts[tree.id]} />
        ))}
      </div>
    </div>
  );
};

export default TreeSelection;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AreaSelection.css";

const AreaSelection = () => {
  const navigate = useNavigate();
  const areas = [
    { id: 1, name: "Area 1" },
    { id: 2, name: "Area 2" },
    { id: 3, name: "Area 3" },
    { id: 4, name: "Area 4" },
  ];

  return (
    <div className="area-selection">
      <h2 id="Title">Select an Area</h2>
      <div className="area-grid">
        {areas.map((area) => (
          <div key={area.id} className="area-card" onClick={() => navigate(`/tree-selection/${area.id}`)}>
            <span>{area.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AreaSelection;

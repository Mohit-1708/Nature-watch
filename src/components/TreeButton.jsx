import React from "react";
import "../styles/TreeButton.css";

const TreeButton = ({ tree, onClick, isAlert }) => {
  return (
    <button className={`tree-button ${isAlert ? "alert" : ""}`} onClick={() => onClick(tree.id)}>
      🌳 {tree.name}
    </button>
  );
};

export default TreeButton;

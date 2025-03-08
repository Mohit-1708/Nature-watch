import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AreaSelection from "./components/AreaSelection";
import TreeSelection from "./components/TreeSelection";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated && (
          <><Route path="/dashboard/:areaId/:treeId" element={<Dashboard />} />
            <Route path="/area-selection" element={<AreaSelection />} />
            <Route path="/tree-selection/:areaId" element={<TreeSelection />} />
            <Route path="/dashboard/:treeId" element={<Dashboard />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./Components/AppRoutes";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
  );
}

export default App;

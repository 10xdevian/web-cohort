import React from "react";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;

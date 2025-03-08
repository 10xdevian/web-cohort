import React from "react";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import Button from "./components/ReUseableComponents";
import HeroSection from "./section/HeroSection";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout />
        <HeroSection/>
      </BrowserRouter>

     
    </div>
  );
}

export default App;

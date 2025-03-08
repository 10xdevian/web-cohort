import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/history" element={<h1>History Page</h1>} />
        <Route path="/event-logs" element={<h1>Event Logs</h1>} />
        <Route path="/user-activities" element={<h1>User Activities</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

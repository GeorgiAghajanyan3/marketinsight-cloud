import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import Surveys from "./pages/Surveys";
import Settings from "./pages/Settings";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div style={{ background: "#0f172a", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/surveys" element={<Surveys />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
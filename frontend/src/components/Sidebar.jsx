import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#1f2937",
        minHeight: "100vh",
        padding: "20px",
        borderRight: "2px solid #ef4444"
      }}
    >
      <h3 style={{ color: "white" }}>Navigation</h3>

      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>📊 Dashboard</Link>
        <Link to="/projects" style={{ color: "white", textDecoration: "none" }}>📁 Projects</Link>
        <Link to="/surveys" style={{ color: "white", textDecoration: "none" }}>📝 Surveys</Link>
        <Link to="/analytics" style={{ color: "white", textDecoration: "none" }}>📈 Analytics</Link>
        <Link to="/settings" style={{ color: "white", textDecoration: "none" }}>⚙️ Settings</Link>
      </div>
    </div>
  );
}
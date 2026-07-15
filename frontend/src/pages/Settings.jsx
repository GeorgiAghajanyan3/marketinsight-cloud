import { useState } from "react";

export default function Settings() {
  const [companyName, setCompanyName] = useState("MarketInsight Cloud");
  const [theme, setTheme] = useState("Dark");
  const [language, setLanguage] = useState("English");
  const [aiReports, setAiReports] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div
      style={{
        color: "white",
        padding: "30px",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>Settings</h1>

      <div
        style={{
          border: "1px solid #ff4d4f",
          borderRadius: "12px",
          padding: "25px",
          maxWidth: "700px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              background: "#1a1a2e",
              color: "white",
              border: "1px solid #ff4d4f",
              borderRadius: "8px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              background: "#1a1a2e",
              color: "white",
              border: "1px solid #ff4d4f",
              borderRadius: "8px",
            }}
          >
            <option>Dark</option>
            <option>Light</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              background: "#1a1a2e",
              color: "white",
              border: "1px solid #ff4d4f",
              borderRadius: "8px",
            }}
          >
            <option>English</option>
            <option>Armenian</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={aiReports}
              onChange={() => setAiReports(!aiReports)}
            />
            {" "}Enable AI Reports
          </label>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() =>
                setEmailNotifications(!emailNotifications)
              }
            />
            {" "}Enable Email Notifications
          </label>
        </div>

        <button
          onClick={saveSettings}
          style={{
            background: "#ff4d4f",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          SAVE SETTINGS
        </button>
      </div>
    </div>
  );
}
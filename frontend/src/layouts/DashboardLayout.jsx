import { Box, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex", bgcolor: "#121212", minHeight: "100vh" }}>
      <Navbar />
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          color: "#fff",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
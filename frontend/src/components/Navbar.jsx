import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#1c1c1c",
        borderBottom: "2px solid #ff2d2d",
      }}
    >
      <Toolbar>
        <RocketLaunchIcon sx={{ color: "#ff2d2d", mr: 2 }} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          MarketInsight Cloud
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Avatar
          sx={{
            bgcolor: "#ff2d2d",
            width: 38,
            height: 38,
          }}
        >
          G
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FolderIcon from "@mui/icons-material/Folder";
import PollIcon from "@mui/icons-material/Poll";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon /> },
  { text: "Projects", icon: <FolderIcon /> },
  { text: "Surveys", icon: <PollIcon /> },
  { text: "Analytics", icon: <AnalyticsIcon /> },
  { text: "Settings", icon: <SettingsIcon /> },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: "#202020",
          color: "#fff",
          borderRight: "2px solid #ff2d2d",
        },
      }}
    >
      <Toolbar />

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            sx={{
              m: 1,
              borderRadius: 2,

              "&:hover": {
                bgcolor: "#ff2d2d",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#ff2d2d" }}>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
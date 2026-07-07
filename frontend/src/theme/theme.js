import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#E53935",
    },

    secondary: {
      main: "#FF5252",
    },

    background: {
      default: "#1B1B1F",
      paper: "#232329",
    },

    text: {
      primary: "#FFFFFF",
      secondary: "#BDBDBD",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "Roboto",
  },
});

export default theme;

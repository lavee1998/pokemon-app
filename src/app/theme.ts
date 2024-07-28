"use client";
import { createTheme } from "@mui/material";

//Create MUI theme
export const theme = createTheme({
  palette: {
    secondary: {
      main: "#FFCB05",
      light: "#FFCB053D",
    },
    primary: {
      main: "#2E6EB5",
      light: "#2E6EB53C",
    },
    warning: {
      main: "#CC3B3B",
      contrastText: "white",
    },
  },
});

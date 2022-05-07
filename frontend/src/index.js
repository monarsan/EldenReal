import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import JimNightshade from "./fonts/JimNightshade.ttf";
import App from "./app";

const theme = createTheme({
  palette: {
    primary: {
      light: "#80302b",
      main: "#4f0000",
      dark: "#300000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#cfcfc7",
      main: "#9e9e96",
      dark: "#707068",
      contrastText: "#000",
    },
    typography: {
      fontFamily: "Jim Nightshade, Arial",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Jim Nightshade';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Jim Nightshade'), url(${JimNightshade}) format('ttf');
            unicodeRange: U+0000-00FF;
          }
        `,
      },
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
  ,document.getElementById("app")
);


import "./App.css";
import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes, useNavigate } from "react-router";
import "./assets/custom.css";
import Main from "./layout/Main";
import { Typography } from "@mui/material";
import { primaryTheme, secondaryTheme } from "./variables/constant";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryTheme,
      },
      secondary: {
        main: secondaryTheme,
      },
    },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "red" },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            background: primaryTheme,
          },
        },
      },
    },
  });

  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Typography variant="span">
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default App;

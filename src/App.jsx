import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Settings from "./pages/Settings";

import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
  },

  typography: { fontFamily: ["Poppins", "sans-serif"].join(",") },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ThemeProvider theme={theme}>
              <AppLayout />
            </ThemeProvider>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="trades" element={<Trades />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Settings from "./pages/Settings";

import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
    </QueryClientProvider>
  );
}

export default App;

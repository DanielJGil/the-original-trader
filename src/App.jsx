import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Trade from "./pages/Trade";
import NewTrade from "./pages/NewTrade";
import Settings from "./pages/Settings";

import { createTheme } from "@mui/material";
import { blueGrey, indigo } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    text: {
      primary: blueGrey[800],
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
            <Route path="trades/:tradeId" element={<Trade />} />
            <Route path="trades/new" element={<NewTrade />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          styles: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#18212f",
            color: "#4b0082",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

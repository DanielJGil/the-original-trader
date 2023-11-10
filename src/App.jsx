import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Trades from "./pages/Trades";
import Trade from "./pages/Trade";
import NewTrade from "./pages/NewTrade";
import Account from "./pages/Account";
import Settings from "./pages/Settings";

import { createTheme } from "@mui/material";
import { blueGrey, indigo, lightBlue } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Signup from "./pages/Signup";
import { useDarkMode } from "./context/DarkModeContext";

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
    primary: lightBlue,
    background: {
      default: "#111827",
      paper: "#18212f",
    },
    text: {
      primary: "#f1f5f9",
      secondary: blueGrey[500],
    },
  },

  typography: { fontFamily: ["Poppins", "sans-serif"].join(",") },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
                  <AppLayout />
                </ThemeProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="trades" element={<Trades />} />
            <Route path="trades/:tradeId" element={<Trade />} />
            <Route path="trades/new" element={<NewTrade />} />
            <Route path="account" element={<Account />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="login"
            element={
              <ThemeProvider theme={theme}>
                <Login />
              </ThemeProvider>
            }
          />

          <Route
            path="signup"
            element={
              <ThemeProvider theme={theme}>
                <Signup />
              </ThemeProvider>
            }
          />
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

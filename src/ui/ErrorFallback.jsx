import { Button } from "@mui/material";
import { useDarkMode } from "../context/DarkModeContext";

function ErrorFallback({ error, resetErrorBoundary }) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col gap-4 justify-center items-center h-screen ${
        isDarkMode && "bg-[#111827]"
      } ${isDarkMode && "text-[#f1f5f9]"}`}
    >
      <h1 className="font-semibold text-3xl uppercase">something went wrong</h1>
      <p>{error.message}</p>
      <Button variant="contained" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}

export default ErrorFallback;

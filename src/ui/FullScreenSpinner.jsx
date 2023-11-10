import { useDarkMode } from "../context/DarkModeContext";

function FullScreenSpinner() {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex justify-center items-center h-screen ${
        isDarkMode && "bg-[#111827]"
      }`}
    >
      <div className="spinner"></div>
    </div>
  );
}

export default FullScreenSpinner;

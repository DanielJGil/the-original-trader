import { useDarkMode } from "../context/DarkModeContext";

function Spinner() {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex justify-center items-center mt-[12rem] ${
        isDarkMode && "bg-[#111827]"
      }`}
    >
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;

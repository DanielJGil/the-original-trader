import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";
import { Button } from "@mui/material";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      style={{
        maxWidth: "50px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px",
        fontSize: "1.3rem",
      }}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </Button>
  );
}

export default DarkModeToggle;

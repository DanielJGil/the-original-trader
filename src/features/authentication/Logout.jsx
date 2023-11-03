import { Button } from "@mui/material";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";
import { useState } from "react";

function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { logout } = useLogout();

  return (
    <Button
      variant="outlined"
      sx={{ fontSize: "1.2rem" }}
      disabled={isLoggingOut}
      onClick={() => {
        setIsLoggingOut(true);
        logout({
          onSuccess: () => {
            setIsLoggingOut(false);
          },
          onError: () => {
            setIsLoggingOut(false);
          },
        });
      }}
    >
      <HiArrowRightOnRectangle />
    </Button>
  );
}

export default Logout;

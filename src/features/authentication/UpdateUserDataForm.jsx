import { Button, TextField } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useUser } from "./useUser";
import { useState } from "react";
import { useUpdateUser } from "./useUpdateUser";
import { useDarkMode } from "../../context/DarkModeContext";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser } = useUpdateUser();

  const { isDarkMode } = useDarkMode();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAvatar = (newFile) => {
    setAvatar(newFile);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    setIsUpdating(true);

    updateUser(
      { fullName, avatar },
      {
        onSettled: () => {
          setIsUpdating(false);
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <TextField
          label="EMAIL ADDRESS"
          size="small"
          value={email}
          disabled
          fullWidth
          sx={{
            maxWidth: "25rem",
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: isDarkMode && "#717880",
              cursor: "not-allowed",
            },
            "& .MuiInputBase-root.Mui-disabled": {
              "& > fieldset": {
                borderColor: isDarkMode && "#2e66ff",
              },
            },
            "& .MuiFormLabel-root.Mui-disabled": {
              color: isDarkMode && "#f1f5f9",
            },
          }}
        />
        <TextField
          label="FULL NAME"
          size="small"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          sx={{
            maxWidth: "25rem",
            "& .MuiInputBase-input": {
              WebkitTextFillColor: isDarkMode ? "#f1f5f9" : "#37474f",
            },
            "& .MuiInputBase-root": {
              "& > fieldset": {
                borderColor: isDarkMode && "#2e66ff",
              },
            },
            "& .MuiFormLabel-root": {
              color: isDarkMode && "#f1f5f9",
            },
          }}
        />
        <MuiFileInput
          label="USER IMAGE"
          size="small"
          sx={{
            maxWidth: "25rem",
            "& .MuiInputBase-input": {
              WebkitTextFillColor: isDarkMode ? "#f1f5f9" : "#37474f",
            },
            "& .MuiInputBase-root": {
              "& > fieldset": {
                borderColor: isDarkMode && "#2e66ff",
              },
            },
            "& .MuiFormLabel-root": {
              color: isDarkMode && "#f1f5f9",
            },
            "& .MuiSvgIcon-root": {
              color: isDarkMode && "#f1f5f9",
            },
          }}
          value={avatar}
          disabled={isUpdating}
          onChange={handleAvatar}
        />

        <div className="flex justify-end gap-3 max-w-sm">
          <Button
            variant="outlined"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Button variant="contained" type="submit" disabled={isUpdating}>
            Update account
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;

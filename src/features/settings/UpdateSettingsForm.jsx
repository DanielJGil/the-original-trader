import { InputAdornment, TextField } from "@mui/material";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";
import { useDarkMode } from "../../context/DarkModeContext";

function UpdateSettingsForm() {
  const { isLoading, settings: { accountSize } = {} } = useSettings();

  const { isDarkMode } = useDarkMode();

  const { updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Update settings</h1>
      </div>

      <form>
        <TextField
          label="ACCOUNT SIZE"
          id="accountSize"
          defaultValue={accountSize}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          onBlur={(e) => handleUpdate(e, "accountSize")}
          sx={{
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
        ></TextField>
      </form>
    </div>
  );
}

export default UpdateSettingsForm;

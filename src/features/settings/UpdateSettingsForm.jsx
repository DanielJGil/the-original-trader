import { InputAdornment, TextField } from "@mui/material";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isLoading, settings: { accountSize } = {} } = useSettings();

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
        ></TextField>
      </form>
    </div>
  );
}

export default UpdateSettingsForm;

import { Button, TextField } from "@mui/material";
import { useDarkMode } from "../../context/DarkModeContext";
import { useForm } from "react-hook-form";
import { useUser } from "../authentication/useUser";
import TextAreaInput from "../../ui/TextAreaInput";
import { useCreateSettings } from "../settings/useCreateSettings";
import { useNavigate } from "react-router-dom";

function SetAccountSizeForm() {
  const navigate = useNavigate();

  const { isDarkMode } = useDarkMode();

  const { user } = useUser();

  const { createSettings } = useCreateSettings();

  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit(newSettings) {
    console.log(newSettings);

    createSettings(newSettings, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  }

  return (
    <div
      className={`flex flex-col gap-6 ${
        isDarkMode && "bg-[#111827]"
      } w-full h-full items-center justify-center`}
    >
      <div className="flex justify-center mb-5">
        <h2
          className={`font-semibold text-3xl ${isDarkMode && "text-[#f1f5f9]"}`}
        >
          What is your account size?
        </h2>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row gap-6">
          <TextField
            label="ACCOUNT SIZE"
            id="accountSize"
            size="small"
            defaultValue=""
            error={errors?.accountSize?.message && true}
            helperText={errors?.accountSize?.message}
            InputProps={{
              ...register("accountSize", {
                required: "This field is required",
              }),
            }}
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
              width: "15rem",
            }}
          />
        </div>

        <div className="hidden">
          <TextAreaInput
            label="USER ID"
            id="userId"
            defaultValue={user?.id}
            InputProps={{ ...register("userId") }}
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <Button variant="contained" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SetAccountSizeForm;

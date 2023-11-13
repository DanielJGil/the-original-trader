import { Button, InputAdornment, TextField } from "@mui/material";
import { useDarkMode } from "../../context/DarkModeContext";
import { useForm } from "react-hook-form";
import { useUser } from "../authentication/useUser";
import TextAreaInput from "../../ui/TextAreaInput";
import { useCreateSettings } from "../settings/useCreateSettings";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SetAccountSizeForm() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { isDarkMode } = useDarkMode();
  const { user } = useUser();
  const { createSettings } = useCreateSettings();

  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit(newSettings) {
    setIsLoading(true);

    createSettings(newSettings, {
      onSuccess: () => {
        setIsLoading(false);
        navigate("/dashboard");
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  }

  return (
    <div
      className={`flex flex-col gap-6 ${
        isDarkMode && "bg-[#111827]"
      } w-full h-full items-center justify-start`}
    >
      {isDarkMode ? (
        <div className="flex items-center justify-center">
          <img src="logo-white.png" alt="" className="h-[18rem]" />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <img src="logo-black.png" alt="" className="h-[18rem]" />
        </div>
      )}

      <div className="flex justify-center mb-3">
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
            disabled={isLoading}
            error={errors?.accountSize?.message && true}
            helperText={errors?.accountSize?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              ...register("accountSize", {
                required: "This field is required",
                minLength: {
                  value: 1,
                  message: "Please set your account size",
                },
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
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: isDarkMode ? "#6c7985" : "#909090",
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
              width: "20rem",
            }}
          />
        </div>

        <div className="hidden">
          <TextAreaInput
            label="USER ID"
            id="userId"
            defaultValue={user?.id}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              ...register("userId"),
            }}
          />
        </div>

        <div className="flex justify-end gap-3 mt-3">
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
            sx={{
              "&.Mui-disabled": {
                background: "#434f70",
                color: "#f1f5f9",
                cursor: "not-allowed",
              },
            }}
          >
            {isLoading ? "Loading..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SetAccountSizeForm;

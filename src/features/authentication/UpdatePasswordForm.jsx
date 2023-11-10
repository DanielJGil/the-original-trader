import { useForm } from "react-hook-form";
import { useUpdateUser } from "./useUpdateUser";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";

function UpdatePasswordForm() {
  const [isUpdating, setIsUpdating] = useState(false);

  const { isDarkMode } = useDarkMode();

  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser } = useUpdateUser();

  function onSubmit({ password }) {
    setIsUpdating(true);

    updateUser(
      { password },
      {
        onSuccess: () => {
          reset();
          setIsUpdating(false);
        },
        onError: () => {
          setIsUpdating(false);
        },
      }
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <TextField
          label="NEW PASSWORD"
          id="password"
          size="small"
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
          disabled={isUpdating}
          type="password"
          error={errors?.password?.message && true}
          helperText={errors?.password?.message}
          InputProps={{
            ...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            }),
          }}
        />

        <TextField
          label="CONFIRM PASSWORD"
          id="passwordConfirm"
          size="small"
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
          disabled={isUpdating}
          type="password"
          error={errors?.passwordConfirm?.message && true}
          helperText={errors?.passwordConfirm?.message}
          InputProps={{
            ...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Password need to match",
            }),
          }}
        />

        <div className="flex justify-end gap-3 max-w-sm">
          <Button
            variant="outlined"
            disabled={isUpdating}
            type="reset"
            onClick={reset}
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

export default UpdatePasswordForm;

import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";
import { useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import { useLogin } from "./useLogin";

function SignupForm() {
  const navigate = useNavigate();

  const { isDarkMode } = useDarkMode();

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const { signup } = useSignup();
  const { login } = useLogin();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    setIsCreatingAccount(true);

    signup(
      { fullName, email, password },
      {
        onSuccess: () => {
          login(
            { email, password },
            {
              onSuccess: () => {
                navigate("/setup");
              },
            }
          );

          setIsCreatingAccount(false);
          reset();
        },

        onError: () => {
          setIsCreatingAccount(false);
          reset();
        },
      }
    );
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
          Create your account
        </h2>
      </div>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row gap-6">
          <TextField
            label="FULL NAME"
            id="fullName"
            size="small"
            defaultValue=""
            disabled={isCreatingAccount}
            error={errors?.fullName?.message && true}
            helperText={errors?.fullName?.message}
            InputProps={{
              ...register("fullName", {
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
          <TextField
            label="EMAIL ADDRESS"
            id="email"
            size="small"
            defaultValue=""
            disabled={isCreatingAccount}
            error={errors?.email?.message && true}
            helperText={errors?.email?.message}
            InputProps={{
              ...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
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
              width: "15rem",
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <TextField
            label="PASSWORD"
            id="password"
            size="small"
            type="password"
            defaultValue=""
            disabled={isCreatingAccount}
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
          <TextField
            label="REPEAT PASSWORD"
            id="passwordConfirm"
            size="small"
            type="password"
            defaultValue=""
            disabled={isCreatingAccount}
            error={errors?.passwordConfirm?.message && true}
            helperText={errors?.passwordConfirm?.message}
            InputProps={{
              ...register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match",
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

        <div className="flex justify-end gap-3 mt-5">
          <Button
            variant="outlined"
            disabled={isCreatingAccount}
            onClick={() => {
              navigate("/login");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isCreatingAccount}
          >
            Create account
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

function LoginForm() {
  const navigate = useNavigate();

  const { isDarkMode } = useDarkMode();

  const [email, setEmail] = useState("wonof45717@jucatyo.com");
  const [password, setPassword] = useState("fakefake");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    setIsLoggingIn(true);

    login(
      { email, password },
      {
        onSettled: () => {
          setIsLoggingIn(false);
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <div
      className={`flex flex-col gap-3 ${
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

      <div className="flex justify-center">
        <h2
          className={`font-semibold text-3xl mb-5 ${
            isDarkMode && "text-[#f1f5f9]"
          }`}
        >
          Log in to your account
        </h2>
      </div>

      <form
        className="flex flex-col gap-6 w-[20rem] mb-6"
        onSubmit={handleSubmit}
      >
        <TextField
          label="EMAIL ADDRESS"
          id="email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
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
          }}
        />

        <TextField
          label="PASSWORD"
          id="password"
          size="small"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
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
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={isLoggingIn}
          sx={{
            "&.Mui-disabled": {
              background: "#434f70",
              color: "#f1f5f9",
              cursor: "not-allowed",
            },
          }}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="flex flex-col justify-center items-center gap-2">
        <p className={`${isDarkMode && "text-[#f1f5f9]"}`}>
          Don't have an account?
        </p>
        <Button
          variant="outlined"
          disabled={isLoggingIn}
          sx={{
            "&.Mui-disabled": {
              background: "#434f70",
              color: "#f1f5f9",
              cursor: "not-allowed",
            },
          }}
          onClick={() => navigate("/signup")}
        >
          Create account
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;

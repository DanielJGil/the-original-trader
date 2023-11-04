import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("guest@example.com");
  const [password, setPassword] = useState("guestguest");
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
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <h2 className="font-semibold text-2xl">Log in to your account</h2>
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
        />

        <TextField
          label="PASSWORD"
          id="password"
          size="small"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />

        <Button type="submit" variant="contained">
          {isLoggingIn ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="flex flex-col justify-center items-center gap-2">
        <p>Don't have an account?</p>
        <Button variant="outlined" onClick={() => navigate("/signup")}>
          Create account
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;

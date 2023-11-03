import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLogin } from "./useLogin";

function LoginForm() {
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
        onSuccess: () => {
          setIsLoggingIn(false);
        },

        onError: () => {
          setIsLoggingIn(false);
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-6 font-semibold text-2xl">
      <div className="flex justify-center">
        <h2>Log in to your account</h2>
      </div>

      <form className="flex flex-col gap-6 w-[20rem]" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default LoginForm;

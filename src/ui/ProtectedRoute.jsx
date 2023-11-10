import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "./FullScreenSpinner";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // LOAD AUTHENTICATED USER
  const { isLoading, isAuthenticated } = useUser();

  // IF NO AUTHENTICATED USER, REDIRECT TO /LOGIN
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // WHILE LOADING, SHOW A SPINNER
  if (isLoading) return <FullScreenSpinner />;

  // IF THERE IS A USER, RENDER THE APP
  if (isAuthenticated) return children;
}

export default ProtectedRoute;

/* eslint react/prop-types: "off" */

import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true }); // Redirect to the homepage if not authenticated
    }
  }, [isAuthenticated, navigate]);

  // Show a fallback UI or loading state while the redirection is happening
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

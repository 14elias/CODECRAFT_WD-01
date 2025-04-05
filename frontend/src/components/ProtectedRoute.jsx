import { useState, useEffect } from "react";
import { isAuthenticated } from "../api/endpoints";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); 

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await isAuthenticated();
        if (response.message === "authenticated") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuth(false);
      }
    };

    fetchAuthStatus();
  }, []);

  // Show a loading state while checking authentication
  if (isAuth === null) {
    return <p>Loading...</p>;
  }

  // Redirect to login if not authenticated
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
}

export default ProtectedRoute;
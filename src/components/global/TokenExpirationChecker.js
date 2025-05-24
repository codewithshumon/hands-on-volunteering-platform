import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";

const TokenExpirationChecker = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      if (token && tokenExpiration) {
        const expirationTime = parseInt(tokenExpiration, 10); // Convert to integer

        if (Date.now() >= expirationTime) {
          // Token has expired
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          dispatch(logout()); // Clear user state in Redux
          navigate("/login"); // Redirect to login page
        } else {
          // Token is still valid, set a timeout to check again when it expires
          const timeUntilExpiration = expirationTime - Date.now();
          setTimeout(checkTokenExpiration, timeUntilExpiration);
        }
      }
    };

    // Initial check
    checkTokenExpiration();

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(checkTokenExpiration);
  }, [dispatch, navigate]);

  return null;
};

export default TokenExpirationChecker;

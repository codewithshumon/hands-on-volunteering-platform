import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../store/slices/authSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserData(token)); // Fetch user data if token exists
    }
  }, [dispatch]);

  return children;
};

export default AuthProvider;

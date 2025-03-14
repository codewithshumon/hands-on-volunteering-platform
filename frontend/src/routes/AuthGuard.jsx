import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children, type, url }) => {
  const location = useLocation();

  const email = location.state?.email;
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);

  if (type === "email" && !email) {
    return <Navigate to={url} />;
  }
  if (type === "auth" && !token && !currentUser) {
    return <Navigate to={url} />;
  }

  if (type === "user" && token && currentUser) {
    return <Navigate to={url} />;
  }

  if (type === "protected" && !token) {
    return <Navigate to={url} />;
  }

  if (type === "redirect" && token) {
    return <Navigate to={url} />;
  }

  return children;
};

export default AuthGuard;

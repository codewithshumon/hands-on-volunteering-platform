import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children, type, url }) => {
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);

  console.log("[currentUser]", currentUser.isEmailVerified);

  if (type === "auth" && !currentUser.isEmailVerified) {
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

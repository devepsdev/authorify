import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth();
  if (authToken) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;

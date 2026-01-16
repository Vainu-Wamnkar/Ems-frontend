import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthRedirect = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // OPTIONAL: token expiry check
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }

    if (decoded.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (decoded.role === "employee") {
      return <Navigate to="/employee-dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default AuthRedirect;

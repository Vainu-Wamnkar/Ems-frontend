import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ FIX

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  // ❌ Token hi nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token); // { id, role }

    // ❌ Role allow nahi hai
    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/employee-dashboard" replace />;
    }

    // ✅ Sab sahi
    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default RoleProtectedRoute;

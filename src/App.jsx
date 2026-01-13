import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ChangePassword from "./pages/ChangePassword";
import ForgetPassword from "./pages/ForgetPassword";
import AddEmployee from "./pages/AddEmployee";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />

          {/* EMPLOYEE + ADMIN */}
          <Route
            path="/employee-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["employee"]}>
                <EmployeeDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/change-password"
            element={
              <RoleProtectedRoute allowedRoles={["employee", "admin"]}>
                <ChangePassword />
              </RoleProtectedRoute>
            }
          />

          {/* ADMIN ONLY */}
          <Route
            path="/admin-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/add-employee"
            element={
              <RoleProtectedRoute allowedRoles={["admin"]}>
                <AddEmployee />
              </RoleProtectedRoute>
            }
          />

          {/* DEFAULT */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

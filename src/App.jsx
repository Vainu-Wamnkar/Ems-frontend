import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ChangePassword from "./pages/ChangePassword";
import ForgetPassword from "./pages/ForgetPassword";
import AddEmployee from "./pages/AddEmployee";

import { AuthProvider } from "./context/AuthContext";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import AuthRedirect from "./routes/AuthRedirect";

import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>

          {/* AUTO CHECK ON LOAD */}
          <Route path="/" element={<AuthRedirect />} />

          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />

          {/* EMPLOYEE */}
          <Route
            path="/employee-dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["employee"]}>
                <EmployeeDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* ADMIN */}
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

          {/* COMMON */}
          <Route
            path="/change-password"
            element={
              <RoleProtectedRoute allowedRoles={["admin", "employee"]}>
                <ChangePassword />
              </RoleProtectedRoute>
            }
          />

          {/* UNKNOWN ROUTE */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

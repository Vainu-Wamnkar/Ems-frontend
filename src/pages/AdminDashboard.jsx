import React, { useState, useEffect } from "react";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Navbar/Topbar";
import DashboardCard from "../components/DashboardCard";

import { Users, Briefcase, ClipboardList } from "lucide-react";

import EmployeeManagement from "./EmployeeManagement";
import DepartmentManagement from "./DepartmentManagement";
import LeaveRequests from "./LeaveRequests";
import RegularizationRequests from "./RegularizationRequests";
import EmployeeCredentials from "./EmployeeCredentials";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const [employeeData, setEmployeeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalPendingLeaves, setTotalPendingLeaves] = useState(0);
  

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [empRes, deptRes, leaveRes] = await Promise.all([
          axios.get("https://ems-backend-ofjk.onrender.com/api/employees", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://ems-backend-ofjk.onrender.com/api/departments/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://ems-backend-ofjk.onrender.com/api/leaves/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const employees = empRes.data.data || [];
        const departments = deptRes.data|| [];
        const leaves = leaveRes.data.data || [];

        setEmployeeData(employees);
        setDepartmentData(departments);
        setLeaveData(leaves);
        console.log(departments)

        setTotalEmployees(employees.length);
        setTotalDepartments(departments.length);

        const pending = leaves.filter(l => l.status === "Pending");
        setTotalPendingLeaves(pending.length);

      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case "employees":
        return <EmployeeManagement employeeData={employeeData} />;

      case "departments":
        return <DepartmentManagement data={departmentData} />;

      case "leaves":
        return <LeaveRequests data={leaveData} />;

      case "regularization":
        return <RegularizationRequests />;

      case "login-credentials":
        return <EmployeeCredentials />;

      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
              title="Total Employees"
              count={totalEmployees}
              icon={<Users className="text-blue-500" />}
            />
            <DashboardCard
              title="Departments"
              count={totalDepartments}
              icon={<Briefcase className="text-green-500" />}
            />
            <DashboardCard
              title="Pending Leave Requests"
              count={totalPendingLeaves}
              icon={<ClipboardList className="text-yellow-500" />}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar onNavigate={setCurrentView} activeKey={currentView} />

      <div className="flex-1 flex flex-col">
        <Topbar title="Admin Dashboard" />
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? <p>Loading...</p> : renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

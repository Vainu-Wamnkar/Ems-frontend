import React, { useState } from "react";
import EmployeeSidebar from "../components/EmployeeSidebar"; // employee wala sidebar

import ProfileDetails from "../components/ProfileDetails";
import AboutCompany from "../components/AboutCompany";
import Setting from "../components/Setting";
import Navbar from "../components/Navbar/Navbar";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import MyLeaves from "./MyLeaves";
import MyRegularization from "./MyRegularization";

function EmployeeDashboard() {
  const [activePage, setActivePage] = useState("home");

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <AttendanceCalendar />;
      case "profile":
        return <ProfileDetails />;
      case "about":
        return <AboutCompany />;
      case "setting":
        return <Setting />;
      case "leaves":
        return <MyLeaves/>
      case "my-regularization":
        return <MyRegularization/>
      default:
        return <AttendanceCalendar />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 🔹 Left Sidebar */}
      <EmployeeSidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* 🔹 Right Side (Topbar + Content) */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar  />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;

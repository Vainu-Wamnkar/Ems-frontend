import React, { useContext, useState } from "react";
import {
  Home,
  Users,
  Briefcase,
  ClipboardList,
  LogOut,
  KeyRound,
  Menu,
  FileClock,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminSidebar = ({ onNavigate, activeKey }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <Home size={18} />, key: "dashboard" },
    { name: "Employees", icon: <Users size={18} />, key: "employees" },
    { name: "Departments", icon: <Briefcase size={18} />, key: "departments" },
    { name: "Leave Requests", icon: <ClipboardList size={18} />, key: "leaves" },
    { name: "Regularization Requests",icon: <FileClock size={18} />,key: "regularization"},
    { name: "Login Credentials", icon: <ClipboardList size={18} />, key: "login-credentials" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div className="md:hidden absolute  text-emerald-500  px-4 py-5">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* 🔹 Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

    <div className={`
          fixed md:static z-50
          top-0 left-0 h-screen w-64
          bg-emerald-500 text-white p-5 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}>

      {/* ❌ Close Button (Mobile) */}
      <div className="md:hidden flex justify-end mb-4">
        <button onClick={() => setOpen(false)}>
          <X size={24} />
        </button>
      </div>

       <ul className="flex flex-col space-y-2 flex-1">
        {menu.map((item) => {
          const isActive = activeKey === item.key;

          return (
            <li 
              key={item.key}
              onClick={() => {
                  onNavigate(item.key)
                  setOpen(false)
                }
              }
              className={`
                flex items-center gap-3 p-2 rounded-lg cursor-pointer
                transition-all duration-200
                ${
                  isActive
                    ? "bg-emerald-800 text-white"
                    : "hover:bg-emerald-600"
                }
              `}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>

      <button
        onClick={handleChangePassword}
        className="flex items-center gap-2 bg-yellow-500 px-3 py-2 rounded-lg hover:bg-yellow-600 mb-3"
      >
        <KeyRound size={16} /> Change Password
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
    </>
  );
};

export default AdminSidebar;

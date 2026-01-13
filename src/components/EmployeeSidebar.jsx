import React, { useContext, useState } from "react";
import {
  Home,
  User,
  Info,
  Settings,
  LogOut,
  ClipboardList,
  FileClock,
  Menu,
  X,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function EmployeeSidebar({ setActivePage, activePage }) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { key: "home", label: "Home", icon: <Home size={18} /> },
    { key: "profile", label: "Profile Details", icon: <User size={18} /> },
    { key: "leaves", label: "My Leaves", icon: <ClipboardList size={18} /> },
    { key: "about", label: "About", icon: <Info size={18} /> },
    { key: "setting", label: "Setting", icon: <Settings size={18} /> },
    { key: "my-regularization", label: "My Regularization", icon: <FileClock size={18} /> },
  ];

  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
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

      {/* 🔹 Sidebar */}
      <div
        className={`
          fixed md:static z-50
          top-0 left-0 h-screen w-64
          bg-emerald-500 text-white p-5 flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
      {/* ❌ Close Button (Mobile) */}
      <div className="md:hidden flex justify-end mb-4">
        <button onClick={() => setOpen(false)}>
          <X size={24} />
        </button>
      </div>

        {/* 🔹 Menu */}
        <ul className="space-y-4 flex-1">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                setActivePage(item.key);
                setOpen(false);
              }}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition text-base
                ${
                  activePage === item.key
                    ? "bg-emerald-800"
                    : "hover:bg-emerald-600"
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        {/* 🔻 Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>  
    </>
  );
}

export default EmployeeSidebar;

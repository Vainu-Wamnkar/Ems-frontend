import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔥 Clear message on focus
  const clearMessage = () => {
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      clearMessage();

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/api/users/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setMessageType("success");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        logout();
        navigate("/login");
      }, 1000);
    } catch (error) {
      const backendMessage =
        error.response?.data?.message || "Something went wrong";

      setMessage(backendMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-indigo-100 py-20 sm:py-0 sm:items-center sm:justify-center">
      
      <div className="w-full h-96 mx-4 sm:mx-0 sm:w-auto max-w-md bg-white/20 backdrop-blur-lg border-2 border-emerald-300 shadow-2xl rounded-xl">
        
        <h2 className="text-2xl font-bold text-center text-white bg-emerald-500 py-3 rounded-t-xl">
          Change Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4 p-6 sm:p-8">
          
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            onFocus={clearMessage}
            className="w-full p-3 rounded bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={clearMessage}
            className="w-full p-3 rounded bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={clearMessage}
            className="w-full p-3 rounded bg-white/70 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          {message && (
            <p
              className={`text-center font-medium ${
                messageType === "error"
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Setting;

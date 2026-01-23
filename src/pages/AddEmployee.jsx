import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // default value
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState(""); // initially empty
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role || !phoneNumber || !department) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://ems-backend-ofjk.onrender.com/api/auth/register",
        { name, email, password, role, phoneNumber, department }
      );

      toast.success(res.data.message);
      setError("");

      // Clear form
      setName("");  
      setEmail("");
      setPassword("");
      setRole("employee"); // reset to default
      setPhoneNumber("");
      setDepartment("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-lg p-8 text-gray-100">
        <h2 className="text-2xl font-bold mb-2 text-center text-green-400">
          Add New Employee
        </h2>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/admin-dashboard")}
          className="mb-6 text-lg text-green-400  hover:text-green-300 underline"
        >
          ← Back to Dashboard
        </button>

        {error && <p className="mb-4 text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Role dropdown */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          {/* Department dropdown */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select Department</option>
            <option value="frontend department">Frontend Department</option>
            <option value="backend department">Backend Department</option>
            <option value="technical department">Technical Department</option>
            <option value="hr department">HR Department</option>
            <option value="marketing department">Marketing Department</option>
          </select>

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-gray-700 border border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="bg-green-400 hover:bg-green-500 text-gray-900 font-semibold py-2 rounded-lg transition duration-300"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const EmployeeCredentials = () => {
  const [employees, setEmployees] = useState([]);
  const [visiblePasswordId, setVisiblePasswordId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search state

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/auth/credentials",
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 TOKEN YAHAN JATA HAI
          },
        }
      );

      setEmployees(res.data.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    } finally {
      setLoading(false);
    }
  };


  const handleEyeClick = (id) => {
    setVisiblePasswordId((prev) => (prev === id ? null : id));
  };

  if (loading) return <p>Loading...</p>;

  // ✅ Filter employees by search term (name)
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Employee Credentials</h2>

      {/* 🔹 Search input (responsive) */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full md:w-1/3 border-2 px-3 py-2 rounded border-green-400"
      />

      {/* Desktop/table view - unchanged for md+ */}
      <div className="hidden md:block">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Password</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{emp.name}</td>
                <td className="border px-4 py-2">{emp.email}</td>

                <td className="border px-4 py-2">
                  <div className="flex items-center gap-2">
                    <input
                      type={visiblePasswordId === emp._id ? "text" : "password"}
                      value={emp.originalPassword} // original password from backend
                      readOnly
                      className="border px-2 py-1 rounded w-full"
                    />

                    <button
                      onClick={() => handleEyeClick(emp._id)}
                      className="text-gray-600 hover:text-black"
                    >
                      {visiblePasswordId === emp._id ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/card view */}
      <div className="md:hidden space-y-3">
        {filteredEmployees.map((emp) => (
          <div key={emp._id} className="border rounded-lg p-3 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-sm">{emp.name}</div>
                <div className="text-sm text-gray-600">{emp.email}</div>
                <div className="mt-2">
                  <input
                    type={visiblePasswordId === emp._id ? "text" : "password"}
                    value={emp.originalPassword}
                    readOnly
                    className="border px-2 py-1 rounded w-full"
                  />
                </div>
              </div>

              <div className="ml-3">
                <button
                  onClick={() => handleEyeClick(emp._id)}
                  className="text-gray-600 hover:text-black"
                >
                  {visiblePasswordId === emp._id ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeCredentials;

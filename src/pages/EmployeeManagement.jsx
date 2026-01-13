import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EmployeeManagement = ({ employeeData }) => {
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (!employeeData || employeeData.length === 0) {
      setFilteredEmployees([]);
      return;
    }

    if (!search.trim()) {
      setFilteredEmployees(employeeData);
    } else {
      const filtered = employeeData.filter(emp =>
        emp.department?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [search, employeeData]);

  return (
    <>
      {/* md+ : render original desktop layout exactly here */}
      <div className="hidden md:block p-6">
        <h3 className="text-xl font-semibold mb-4">Employee Management</h3>

        <div className="flex gap-2 mb-4">
          <Link to="/add-employee">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              + Add Employee
            </button>
          </Link>

          <input
            type="text"
            placeholder="Search by department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-500 px-3 rounded w-1/2"
          />
        </div>

        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(emp => (
                <tr key={emp._id} className="border-t">
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">{emp.role}</td>
                  <td className="p-3 text-center space-x-2">
                    <button className="bg-yellow-400 px-3 py-1 rounded text-white">
                      Edit
                    </button>
                    <button className="bg-red-500 px-3 py-1 rounded text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view (< md) - responsive/cards */}
      <div className="md:hidden p-4">
        <h3 className="text-xl font-semibold mb-4">Employee Management</h3>

        <div className="flex flex-col gap-2 mb-4 items-start">
          <Link to="/add-employee" className="w-full">
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded">
              + Add Employee
            </button>
          </Link>

          <input
            type="text"
            placeholder="Search by department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded w-full"
          />
        </div>

        <div className="space-y-3">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(emp => (
              <div key={emp._id} className="bg-white border rounded p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm">{emp.name}</div>
                    <div className="text-xs text-gray-500">{emp.department}</div>
                    <div className="text-xs text-gray-500">{emp.role}</div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button className="bg-yellow-400 px-3 py-1 rounded text-white text-xs">
                      Edit
                    </button>
                    <button className="bg-red-500 px-3 py-1 rounded text-white text-xs">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No employees found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeManagement;

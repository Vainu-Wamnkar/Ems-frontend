import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateDepartment from "./CreateDepartment";
import DeleteDepartment from "./DeleteDepartment";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch Departments
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://ems-backend-ofjk.onrender.com/api/departments/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDepartments(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching departments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <>
      {/* md+ : original desktop layout (unchanged) */}
      <div className="hidden md:block p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Department & Role Management</h3>

          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
          >
            + Add Department
          </button>
        </div>

        {/* Create Department Form */}
        {showForm && (
          <div className="mb-6">
            <CreateDepartment
              onSuccess={fetchDepartments}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Loading */}
        {loading && <p className="text-gray-500">Loading departments...</p>}

        {/* Department List */}
        {!loading && departments.length === 0 && (
          <p className="text-gray-500">No departments found</p>
        )}

        {departments?.map((d) => (
          <div key={d._id} className="bg-white p-4 rounded-lg shadow mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-800">{d.name}</h4>

                <ul className="list-disc ml-5 text-sm text-gray-600 mt-1">
                  {d.roles.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Delete Button Component */}
              <DeleteDepartment
                departmentId={d._id}
                onSuccess={fetchDepartments}
              />
            </div>
          </div>
        ))}
      </div>

      {/* mobile (< md) layout only */}
      <div className="md:hidden max-w-3xl mx-auto p-4">
        <div className="flex flex-col gap-3 mb-4">
          <h3 className="text-lg font-semibold">Department & Role Management</h3>

          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 text-center"
          >
            + Add Department
          </button>
        </div>

        {/* Create Department Form */}
        {showForm && (
          <div className="mb-6">
            <CreateDepartment
              onSuccess={fetchDepartments}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}

        {loading && <p className="text-gray-500">Loading departments...</p>}

        {!loading && departments.length === 0 && (
          <p className="text-gray-500">No departments found</p>
        )}

        {departments?.map((d) => (
          <div key={d._id} className="bg-white p-4 rounded-lg shadow mb-3">
            <div className="flex flex-col">
              <h4 className="font-semibold text-gray-800">{d.name}</h4>

              <ul className="ml-4 text-sm text-gray-600 mt-2 space-y-1">
                {d.roles.map((r, i) => (
                  <li key={i} className="list-disc">{r}</li>
                ))}
              </ul>

              <div className="mt-3">
                <DeleteDepartment
                  departmentId={d._id}
                  onSuccess={fetchDepartments}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DepartmentManagement;

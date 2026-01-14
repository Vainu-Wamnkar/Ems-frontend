import React, { useState } from "react";
import axios from "axios";

const CreateDepartment = ({ onSuccess, onClose }) => {
  const [deptName, setDeptName] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add Role
  const addRole = () => {
    if (!roleInput.trim()) return;
    setRoles([...roles, roleInput]);
    setRoleInput("");
  };

  // Submit
  const submitDepartment = async (e) => {
    e.preventDefault();

    if (!deptName.trim()) {
      return alert("Department name is required");
    }

    try {
      setLoading(true);

      await axios.post(
        "https://ems-backend-ofjk.onrender.com/api/departments/add",
        { name: deptName, roles },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onSuccess(); // refresh list
      onClose();   // close form
    } catch (error) {
      alert(error.response?.data?.message || "Error creating department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow max-w-md">
      <h4 className="font-semibold mb-3">Create Department</h4>

      <form onSubmit={submitDepartment} className="space-y-3">
        <input
          type="text"
          placeholder="Department Name"
          className="w-full border px-3 py-2 rounded"
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
        />

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add Role"
            className="flex-1 border px-3 py-2 rounded"
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
          />
          <button
            type="button"
            onClick={addRole}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Add
          </button>
        </div>

        {roles.length > 0 && (
          <ul className="list-disc ml-5 text-sm text-gray-600">
            {roles.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDepartment;

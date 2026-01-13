import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"

const DeleteDepartment = ({ departmentId, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);

      await axios.delete(
        `http://localhost:5000/api/departments/${departmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onSuccess(); // refresh department list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteDepartment;

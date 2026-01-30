import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaveRequests = ({ data }) => {
  const [leaves, setLeaves] = useState([]);
  const token = localStorage.getItem("token");

  // 🔹 Sync props → state
  useEffect(() => {
    setLeaves(Array.isArray(data) ? data : []);
  }, [data]);

  // 🔹 Date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // 🔹 Approve / Reject logic
  const updateStatus = async (id, status) => {
    // Optimistic UI
    setLeaves((prev) =>
      prev.map((l) =>
        l._id === id ? { ...l, status } : l
      )
    );

    try {
      await axios.put(
        `https://ems-backend-ofjk.onrender.com/api/leaves/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  // 🔹 Button renderer (FINAL LOGIC)
  const renderActionButton = (l) => {
    // ✅ Pending → 50 / 50
    if (l.status === "Pending") {
      return (
        <>
          <button
            onClick={() => updateStatus(l._id, "Approved")}
            className="w-1/2 bg-green-500 text-white py-2 rounded flex items-center justify-center"
          >
            Approve
          </button>
          <button
            onClick={() => updateStatus(l._id, "Rejected")}
            className="w-1/2 bg-red-500 text-white py-2 rounded flex items-center justify-center"
          >
            Reject
          </button>
        </>
      );
    }

    // ✅ Approved → 100%
    if (l.status === "Approved") {
      return (
        <button
          disabled
          className="w-full bg-green-500 text-white py-2 rounded opacity-60 cursor-not-allowed flex items-center justify-center"
        >
          Approved
        </button>
      );
    }

    // ✅ Rejected → 100%
    if (l.status === "Rejected") {
      return (
        <button
          disabled
          className="w-full bg-red-500 text-white py-2 rounded opacity-60 cursor-not-allowed flex items-center justify-center"
        >
          Rejected
        </button>
      );
    }
  };

  return (
    <>
      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block p-6">
        <h3 className="text-lg font-semibold mb-4">Leave Requests</h3>

        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((l) => (
                <tr key={l._id} className="border-t text-sm">
                  <td className="p-3">{l.user?.name}</td>
                  <td className="p-3">{l.reason}</td>
                  <td className="p-3">
                    {formatDate(l.startDate)} to{" "}
                    {formatDate(l.endDate)}
                  </td>
                  <td className="p-3">{l.status}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      {renderActionButton(l)}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No leave requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden p-4">
        <h3 className="text-lg font-semibold mb-4">
          Leave Requests
        </h3>

        <div className="space-y-3">
          {leaves.map((l) => (
            <div
              key={l._id}
              className="bg-white rounded-lg shadow p-3 border"
            >
              <div className="font-semibold text-sm">
                {l.user?.name}
              </div>
              <div className="text-sm text-gray-700 mt-1">
                {l.reason}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {formatDate(l.startDate)} to{" "}
                {formatDate(l.endDate)}
              </div>
              <div className="text-xs mt-1">
                <span className="font-medium">Status:</span>{" "}
                {l.status}
              </div>

              <div className="mt-3 flex gap-2">
                {renderActionButton(l)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeaveRequests;

import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const token = localStorage.getItem("token");

  // Format date to DD-MM-YYYY
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // 🔹 Fetch leave requests
  const fetchLeaves = async () => {
    try {
      let url = "https://ems-backend-ofjk.onrender.com/api/leaves/all";
      if (fromDate && toDate) {
        url += `?from=${fromDate}&to=${toDate}`;
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeaves(res.data.data || res.data);
      console.log("Leaves:", res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err);
    }
  };

  // 🔹 Update leave status
  const updateStatus = async (id, status) => {
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

      // Frontend state update
      setLeaves((prev) =>
        prev.map((l) => (l._id === id ? { ...l, status } : l))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <>
      {/* md+ (desktop/table) - unchanged layout */}
      <div className="hidden md:block p-6">
        <h3 className="text-lg font-semibold mb-4">Leave Requests</h3>

        {/* Date filter */}
        <div className="mb-4 flex items-center gap-2">
          <label>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-1 rounded"
          />
          <label>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-1 rounded"
          />
          <button
            onClick={fetchLeaves}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Filter
          </button>
        </div>

        {/* Leave table */}
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr key={l._id} className="border-t text-sm">
                <td className="p-3">{l.user?.name}</td>
                <td className="p-3">{l.reason}</td>
                <td className="p-3">
                  {formatDate(l.startDate)} to {formatDate(l.endDate)}
                </td>
                <td className="p-3">{l.status}</td>

                <td className="p-3 text-center space-x-2">
                  {l.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(l._id, "Approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(l._id, "Rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile (< md) - stacked filters + card list */}
      <div className="md:hidden p-4">
        <h3 className="text-lg font-semibold mb-4">Leave Requests</h3>

        <div className="mb-4 flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="text-sm">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm">To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </div>

          <button
            onClick={fetchLeaves}
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 w-full"
          >
            Filter
          </button>
        </div>

        <div className="space-y-3">
          {leaves.map((l) => (
            <div key={l._id} className="bg-white rounded-lg shadow p-3 border">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-sm">{l.user?.name}</div>
                  <div className="text-sm text-gray-700 mt-1">{l.reason}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(l.startDate)} to {formatDate(l.endDate)}
                  </div>
                  <div className="text-xs mt-1">
                    <span className="font-medium">Status:</span> {l.status}
                  </div>
                </div>
              </div>

              {l.status === "Pending" && (
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => updateStatus(l._id, "Approved")}
                    className="w-full sm:w-auto bg-green-500 text-white px-3 py-2 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(l._id, "Rejected")}
                    className="w-full sm:w-auto bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeaveRequests;

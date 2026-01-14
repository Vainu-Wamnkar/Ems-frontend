import React, { useEffect, useState } from "react";
import axios from "axios";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const token = localStorage.getItem("token");

  // Format date as DD-MM-YYYY
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Fetch logged-in user's leaves
  const fetchMyLeaves = async () => {
    try {
      const res = await axios.get("https://ems-backend-ofjk.onrender.com/api/leaves/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)

      setLeaves(res.data.data || res.data);
      console.log("My Leaves:", res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err);
    }
  };

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  // Status color
  const getStatusColor = (status) => {
    if (status === "Approved") return "bg-green-500 text-white";
    if (status === "Rejected") return "bg-red-500 text-white";
    if (status === "Pending") return "bg-yellow-400 text-black";
    return "";
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">My Leaves</h3>

      <table className="w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr className="text-left text-sm text-gray-600">
            <th className="p-3">Reason</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-3 text-center">
                No leaves found
              </td>
            </tr>
          ) : (
            leaves.map((l) => (
              <tr key={l._id} className="border-t text-sm">
                <td className="p-3">{l.reason}</td>
                <td className="p-3">
                  {formatDate(l.startDate)} to {formatDate(l.endDate)}
                </td>
                <td className={`p-2 text-center rounded ${getStatusColor(l.status)}`}>
                  {l.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyLeaves;

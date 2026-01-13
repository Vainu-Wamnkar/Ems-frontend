import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RegularizationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // ================= FETCH ALL =================
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/regularization/all",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRequests(res.data.data);
    } catch {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= APPROVE / REJECT =================
  const updateStatus = async (id, status) => {
    // 🔥 STEP 1: UI instantly update
    setRequests((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, status } : r
      )
    );

    try {
      setProcessingId(id);

      await axios.put(
        `http://localhost:5000/api/regularization/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(`Request ${status} successfully`);
    } catch (error) {
      // ❌ rollback if error
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: "Pending" } : r
        )
      );
      toast.error(error.response?.data?.message || "Error");
    } finally {
      setProcessingId(null);
    }
  };

  // ================= UI =================
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Regularization Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <>
          {/* Desktop/table view - unchanged for md+ */}
          <div className="hidden md:block">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Employee</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Reason</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="text-center">
                    <td className="border p-2">{req.user?.name}</td>
                    <td className="border p-2">{req.user?.email}</td>
                    <td className="border p-2">{req.date}</td>
                    <td className="border p-2">{req.reason}</td>

                    <td className="border p-2">
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold
                          ${
                            req.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : req.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td className="border p-2 space-x-2">
                      {req.status === "Pending" && (
                        <>
                          <button
                            disabled={processingId === req._id}
                            onClick={() =>
                              updateStatus(req._id, "Approved")
                            }
                            className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
                          >
                            Approve
                          </button>

                          <button
                            disabled={processingId === req._id}
                            onClick={() =>
                              updateStatus(req._id, "Rejected")
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
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

          {/* Mobile/card view */}
          <div className="md:hidden space-y-3">
            {requests.map((req) => (
              <div key={req._id} className="border rounded-lg p-3 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{req.user?.name}</div>
                    <div className="text-xs text-gray-500">{req.user?.email}</div>
                    <div className="text-sm mt-2">{req.date}</div>
                    <div className="text-sm mt-1 text-gray-700">{req.reason}</div>
                  </div>

                  <div className="ml-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                        ${
                          req.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : req.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>

                {req.status === "Pending" && (
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <button
                      disabled={processingId === req._id}
                      onClick={() => updateStatus(req._id, "Approved")}
                      className="w-full sm:w-auto bg-green-600 text-white px-3 py-2 rounded disabled:opacity-50"
                    >
                      Approve
                    </button>

                    <button
                      disabled={processingId === req._id}
                      onClick={() => updateStatus(req._id, "Rejected")}
                      className="w-full sm:w-auto bg-red-600 text-white px-3 py-2 rounded disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RegularizationRequests;

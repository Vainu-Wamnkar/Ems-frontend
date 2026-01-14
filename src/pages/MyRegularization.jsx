import React, { useEffect, useState } from "react";
import axios from "axios";

const MyRegularization = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRegularization = async () => {
    try {
      const res = await axios.get(  
        "https://ems-backend-ofjk.onrender.com/api/regularization/my",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }       
      );
      setData(res.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRegularization();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Regularization Requests</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No regularization requests found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Applied For</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="p-2 border">{item.date}</td>
                  <td className="p-2 border">{item.reason}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm
                        ${
                          item.status === "Approved"
                            ? "bg-green-500"
                            : item.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-2 border">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRegularization;

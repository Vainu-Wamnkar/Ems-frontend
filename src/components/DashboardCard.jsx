import React from "react";

const DashboardCard = ({ title, count, icon }) => (
  <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center justify-between">
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <h2 className="text-2xl font-bold mt-1">{count}</h2>  
    </div>
    <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
  </div>
);

export default DashboardCard;

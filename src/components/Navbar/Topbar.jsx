import React from "react";

const Topbar = ({ title, onSearch }) => {
  return (
    <div className="bg-white shadow flex items-center justify-between px-6 sm:px-8 py-4">
      
      {/* 🔹 Title */}
      <h2 className="text-lg  px-6 sm:text-xl font-semibold text-gray-800">
        {title}
      </h2>

      {/* 🔹 Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="border rounded-lg px-3 py-1 text-sm w-32 sm:w-48 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
          
          {/* AD Circle */}
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
            AD
          </div>


      </div>
    </div>
  );
};

export default Topbar;

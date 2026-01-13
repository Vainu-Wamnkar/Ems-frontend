import React from "react";

const AttendanceSummary = ({ summary }) => {
  return (
    <div className="mt-6 bg-white shadow rounded-2xl p-6 border border-gray-200 text-lg md:text-xl">
      <h3 className=" font-bold text-blue-900 mb-5">
        Attendance This Month 
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-4 bg-green-50 rounded-xl shadow">
          <p className="text-sm font-medium">Present</p>
          <p className="text-lg font-bold text-green-700">
            {summary.present}
          </p>
        </div>

        <div className="p-4 bg-red-50 rounded-xl shadow">
          <p className="text-sm font-medium">Absent</p>
          <p className="text-lg font-bold text-red-700">
            {summary.absent}
          </p>
        </div>

        <div className="p-4 bg-sky-50 rounded-xl shadow">
          <p className="text-sm font-medium">Leave</p>
          <p className="text-lg font-bold text-sky-600">
            {summary.leave}
          </p>
        </div>

        <div className="p-4 bg-yellow-50 rounded-xl shadow">
          <p className="text-sm font-medium">Holiday</p>
          <p className="text-lg font-bold text-yellow-600">
            {summary.holiday}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;

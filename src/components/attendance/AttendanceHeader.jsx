import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AttendanceHeader = ({ currentMonth, onPrev, onNext }) => {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();

  return (
    <div className="flex justify-between items-center mb-6">
      <button
        onClick={onPrev}
        className="p-2 bg-white rounded-full shadow hover:bg-indigo-50"
      >
        <ChevronLeft className="text-indigo-600" />
      </button>
      <h2 className="text-2xl font-bold text-indigo-700">
        {monthNames[month]} {year}
      </h2>
      <button
        onClick={onNext}
        className="p-2 bg-white rounded-full shadow hover:bg-indigo-50"
      >
        <ChevronRight className="text-indigo-600" />
      </button>
    </div>
  );
};

export default AttendanceHeader;

  import React from "react";

  const CalendarGrid = ({ currentMonth, attendanceData, onDateClick }) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    // Dates array with null for empty slots
    const dates = Array.from({ length: firstDayIndex }, () => null)
      .concat(Array.from({ length: totalDays }, (_, i) => i + 1));

    // -------------------- Status logic --------------------
    const getStatus = (day) => {
      if (!day) return null;
      const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      let status = attendanceData?.[dateKey];

      const isSunday = new Date(year, month, day).getDay() === 0;
      const isPastDate =
        year < todayYear ||
        (year === todayYear && (month < todayMonth || (month === todayMonth && day < todayDate)));

      // Sunday = holiday if past and no data
      if (!status) {
        if (isSunday && isPastDate) status = "holiday";
        else if (isPastDate && !isSunday) status = "absent";
      }

      return status;
    };

    const getDotColor = (status) => {
      switch (status) {
        case "present":
          return "bg-green-500";
        case "absent":
          return "bg-red-500";
        case "leave":
          return "bg-sky-400";
        case "holiday":
          return "bg-yellow-400";
        default:
          return "bg-transparent";
      }
    };

    return (
      <div className="overflow-hidden rounded-2xl w-full shadow bg-white border-2 border-gray-300">
        {/* Days row */}
        <div className="grid grid-cols-7 border-b border-gray-400">
          {days.map((d, i) => (
            <div
              key={i}
              className={`h-12 flex items-center justify-center font-semibold text-white border-r last:border-none ${
                d === "Sun" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Dates grid */}
        <div className="grid grid-cols-7">
          {dates.map((day, i) => {
            if (!day)
              return (
                <div
                  key={i}
                  className="h-20 border border-gray-200 bg-gray-50"
                />
              );

            const status = getStatus(day);
            const isSunday = new Date(year, month, day).getDay() === 0;
            const isToday =
              day === todayDate && month === todayMonth && year === todayYear;

            return (
              <div
                key={i}
                onClick={() => onDateClick(day, year, month)}
                className={`relative h-20 flex flex-col items-center justify-center border border-gray-300 cursor-pointer transition
                  ${isSunday ? "bg-red-500 hover:bg-red-200" : "hover:bg-indigo-100"}
                  ${isToday ? "ring-2 bg-indigo-200" : ""}`}
              >
                <p
                  className={`text-base font-semibold ${
                    isSunday ? "text-white" : "text-gray-700"
                  }`}
                >
                  {day}
                </p>
                <span className={`w-3 h-3 rounded-full mt-2 ${getDotColor(status)}`} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  export default CalendarGrid;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AttendanceHeader from "./AttendanceHeader";
import CalendarGrid from "./CalendarGrid";
import AttendanceSummary from "./AttendanceSummary";
import AttendancePopup from "./AttendancePopup";

const AttendanceCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});

  // ================= FETCH ALL ATTENDANCE =================
  useEffect(() => {
    fetchAttendanceForCalendar();
  }, []);

  const fetchAttendanceForCalendar = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/attendance/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const formattedData = {};
      res.data.forEach((item) => {
        formattedData[item.date] = item.status.toLowerCase();
      });

      setAttendanceData(formattedData);
    } catch (err) {
      console.error("Calendar attendance fetch error", err);
    }
  };

  // ================= MONTH WISE SUMMARY (🔥 MAIN LOGIC) =================
  const summary = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const temp = {
      present: 0,
      absent: 0,
      leave: 0,
      holiday: 0,
    };

    Object.entries(attendanceData).forEach(([date, status]) => {
      const d = new Date(date);

      if (d.getFullYear() === year && d.getMonth() === month) {
        if (status === "present") temp.present++;
        if (status === "absent") temp.absent++;
        if (status === "leave") temp.leave++;
        if (status === "holiday") temp.holiday++;
      }
    });

    return temp;
  }, [attendanceData, currentMonth]);

  // ================= HANDLERS =================
  const handlePrevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );

  const handleNextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  const handleDateClick = (day, year, month) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    setSelectedDate(dateKey);
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <AttendanceHeader
        currentMonth={currentMonth}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />

      <CalendarGrid
        currentMonth={currentMonth}
        attendanceData={attendanceData}
        onDateClick={handleDateClick}
      />

      {/* 🔥 Month wise summary */}
      <AttendanceSummary summary={summary} />

      {selectedDate && (
        <AttendancePopup
          selectedDate={selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default AttendanceCalendar;

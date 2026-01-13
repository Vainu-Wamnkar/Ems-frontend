import React, { useState } from "react";
import AttendanceForm from "./AttendanceForm";
import LeaveForm from "./LeaveForm";
import RegulizationForm from "./RegulizationForm";

const AttendancePopup = ({ selectedDate, onClose }) => {
  const [view, setView] = useState("main");

  // ---------- DATE CHECK FUNCTIONS ----------
  const isPastDate = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const clickedDate = new Date(dateStr);
    clickedDate.setHours(0, 0, 0, 0);

    return clickedDate < today;
  };

  const isTodayOrFuture = (dateStr) => {
    return !isPastDate(dateStr);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-96 text-center shadow-xl">
        {view === "main" && (
          <>
            <h3 className="font-bold mb-5 text-lg text-gray-800">
              {selectedDate}
            </h3>

            <div className="flex flex-col gap-3">
              {/* -------- Attendance -------- */}
              <button
                onClick={() => setView("attendance")}
                className="w-full py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Mark Attendance
              </button>

              {/* -------- Regularization (ONLY PAST DATE) -------- */}
              <button
                onClick={() => {
                  if (!isPastDate(selectedDate)) {
                    onClose();
                    return;
                  }
                  setView("regularization");
                }}
                className="w-full py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition"
              >
                Regularization
              </button>

              {/* -------- Leave (ONLY TODAY OR FUTURE) -------- */}
              <button
                onClick={() => {
                  if (!isTodayOrFuture(selectedDate)) {
                    onClose(); // past date → close popup
                    return;
                  }
                  setView("leave");
                }}
                className="w-full py-2 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
              >
                Apply Leave
              </button>
            </div>
          </>
        )}

        {/* ---------- VIEWS ---------- */}
        {view === "attendance" && (
          <AttendanceForm selectedDate={selectedDate} onClose={onClose} />
        )}

        {view === "regularization" && (
          <RegulizationForm
            selectedDate={selectedDate}
            onClose={onClose}
          />
        )}

        {view === "leave" && <LeaveForm selectedDate={selectedDate} onClose={onClose} />}

        {/* ---------- CLOSE ---------- */}
        <button
          onClick={onClose}
          className="mt-5 bg-red-500 w-full text-white py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AttendancePopup;

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RegulizationForm = ({ selectedDate, onClose }) => {
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "https://ems-backend-ofjk.onrender.com/api/regularization",
        {
          date: selectedDate,
          reason: e.target.reason.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("✅ Regularization Applied Successfully!");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "❌ Regularization failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Apply Regularization</h3>

      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        {/* -------- Date (Readonly) -------- */}
        <input
          type="date"
          value={selectedDate}
          readOnly
          className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg bg-gray-100"
        />

        {/* -------- Reason -------- */}
        <textarea
          name="reason"
          required
          rows="4"
          placeholder="Enter reason"
          className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg resize-none"
        />

        {/* -------- Submit -------- */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RegulizationForm;

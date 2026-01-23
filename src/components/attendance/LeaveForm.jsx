import React from "react";
import axios from "axios";
import {toast} from "react-hot-toast"

const LeaveForm = ({ onClose }) => {
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/leaves/apply",
        {
          startDate: formData.from,
          endDate: formData.to,
          reason: formData.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
    );
    console.log(res.data)

    toast.success(res.data.message || "Leave Applied Succesfully")
    onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="text-left">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
        Apply Leave
      </h3>

      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            From Date
          </label>
          <input
            type="date"
            name="from"
            required
            className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            To Date
          </label>
          <input
            type="date"
            name="to"
            required
            className="w-full px-3 py-2 border-2  border-gray-400 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Reason
          </label>
          <textarea
            name="reason"
            rows="3"  
            required
            className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-sky-600 text-white py-2 rounded-lg"
        >
          Submit Leave
        </button>
      </form>
    </div>
  );
};

export default LeaveForm;

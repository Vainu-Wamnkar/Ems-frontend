import React, { useContext, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      login(res.data.user, res.data.token);

      if (res.data.user.role === "admin") {
        toast.success("Welcome Dear Admin");
        navigate("/admin-dashboard");
      } else {
        toast.success("Welcome Dear Employee");
        navigate("/employee-dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-blue-950 via-indigo-950 to-black">

      {/* LEFT UI */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700 relative p-10 flex-col justify-center items-center text-white overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

        <h1 className="text-5xl font-bold text-center leading-tight drop-shadow-lg">
          Welcome to
          <br />
          <span className="text-yellow-300">
            Sedmec Mechatronics Pvt. Ltd.
          </span>
        </h1>

        <p className="mt-6 text-white/90 text-center text-lg w-3/4">
          Smart and modern EMS System to manage employees with
          speed, accuracy, and efficiency.
        </p>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-4 sm:px-6 lg:px-10 relative">

        {/* Glow behind form */}
        <div className="absolute w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>

        <form
          onSubmit={submit}
          className="
            relative
            w-full max-w-md
            bg-transparent
            p-8
            rounded-2xl
            backdrop-blur-xl
            border border-white/20
            shadow-[0_0_40px_rgba(16,185,129,0.35)]
          "
        >
          <h2 className="text-3xl font-bold text-center text-emerald-400 mb-8">
            EMS SYSTEM
          </h2>

          {/* Email */}
          <div>
            <label className="text-white/80 text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="
                w-full mt-2 p-3
                bg-transparent
                border border-white/30
                rounded-lg
                text-white
                placeholder-white/50
                focus:ring-2 focus:ring-emerald-400
                focus:border-transparent
                outline-none
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label className="text-white/80 text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="
                w-full mt-2 p-3
                bg-transparent
                border border-white/30
                rounded-lg
                text-white
                placeholder-white/50
                focus:ring-2 focus:ring-emerald-400
                focus:border-transparent
                outline-none
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot */}
          <div className="flex justify-end mt-3">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-emerald-300 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full mt-6 py-3
              bg-emerald-500/90
              hover:bg-emerald-600
              text-white
              font-semibold
              rounded-lg
              transition
              shadow-lg
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
  
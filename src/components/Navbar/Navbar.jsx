import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () =>{
  const {user}=useContext(AuthContext)
  return(
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-lg sm:text-2xl font-bold text-blue-900  px-10">Hello, {user?.name}</h2>
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/40"
          alt="admin"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </div>
  )
}



export default Navbar;
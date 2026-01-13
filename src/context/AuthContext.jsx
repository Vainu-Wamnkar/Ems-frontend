import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Create Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [employeeData,setemployeeData]=useState(null);

  // load user when token exists
    useEffect(() => {
      if (token) {
        const savedUser = JSON.parse(localStorage.getItem("userInfo"));
        setUser(savedUser);
        console.log(employeeData)
      }
    }, [token]);




  // Login function
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    
    localStorage.setItem("userInfo",JSON.stringify(userData))
    localStorage.setItem("token", jwtToken);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    toast.success("Logout Successful")
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, employeeData,setemployeeData }}>
      {children}
    </AuthContext.Provider>
  );
};

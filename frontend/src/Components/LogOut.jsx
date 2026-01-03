import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const LogOut = () => {
    const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Optional: clear everything
    // localStorage.clear();

    // Redirect to login
    navigate("/login", { replace: true });
  }, [navigate]);
  return null
}

export default LogOut
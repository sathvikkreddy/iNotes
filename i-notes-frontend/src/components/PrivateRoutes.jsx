import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const PrivateRoutes = () => {
  const { loginState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginState) {
      // Redirect to login page when user is not logged in
      navigate("/login");
    }
  }, [loginState, navigate]);

  return loginState ? <Outlet /> : null;
};

export default PrivateRoutes;

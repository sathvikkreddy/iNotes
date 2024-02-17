import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";

function Layout() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default Layout;

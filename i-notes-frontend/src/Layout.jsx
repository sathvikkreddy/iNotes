import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";
import NotesProvider from "./context/NotesProvider";

function Layout() {
  return (
    <div
      style={{
        fontFamily: "Poppins",
        fontWeight: "400",
        fontStyle: "normal",
      }}
    >
      <AuthProvider>
        <NotesProvider>
          <Navbar />
          <Outlet />
        </NotesProvider>
      </AuthProvider>
    </div>
  );
}

export default Layout;

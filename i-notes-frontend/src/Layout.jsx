import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";
import NotesProvider from "./context/NotesProvider";

function Layout() {
  return (
    <>
      <AuthProvider>
        <NotesProvider>
          <Navbar />
          <Outlet />
        </NotesProvider>
      </AuthProvider>
    </>
  );
}

export default Layout;

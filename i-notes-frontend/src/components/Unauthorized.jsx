import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div className="container my-4">
      <h1>401 - Denied Access</h1>
      <p>
        You are not authorized to visit this page. Try logging in or signing up
        if you are new user.
      </p>
      <button
        className="btn btn-primary mx-3 my-3"
        onClick={(e) => {
          e.preventDefault();
          navigate("/login");
        }}
      >
        Login
      </button>
      <button
        className="btn btn-primary mx-3 my-3"
        onClick={(e) => {
          e.preventDefault();
          navigate("/signUp");
        }}
      >
        Sign Up
      </button>
    </div>
  );
}

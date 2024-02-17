import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="container my-4">
      <h1>404 - Page not found</h1>
      <p>You are directed to an unavailable page.</p>
      <button
        className="btn btn-primary mx-3 my-3"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Go To Home
      </button>
    </div>
  );
}

export default PageNotFound;

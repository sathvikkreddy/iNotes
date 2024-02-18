import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const AuthProvider = useContext(AuthContext);
  const navigate = useNavigate();
  const { loginState, logout } = AuthProvider;

  const handleAuthClick = (e) => {
    e.preventDefault();
    if (loginState) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <i
              role="button"
              className={`fa-regular fa-user mx-2 ${
                !loginState ? "d-none" : ""
              }`}
              onClick={() => navigate("/profile")}
            ></i>
            <button
              className="btn btn-primary mx-2"
              onClick={(e) => handleAuthClick(e)}
            >
              {loginState ? "logout" : "login"}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

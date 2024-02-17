import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function ProfileDropdown() {
  // const navigate = useNavigate();

  // AuthContext
  const AuthProvider = useContext(AuthContext);
  const { loginState, logout } = AuthProvider;

  const onLogout = () => {
    console.log("logging out");
    logout();
  };

  let component;
  if (loginState) {
    component = (
      <div>
        <Link
          class="nav-link dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown
        </Link>
        <ul class="dropdown-menu">
          <li>
            <Link class="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>

          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <Link class="dropdown-item" to="/home" onClick={onLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    component = (
      <div>
        <Link
          class="nav-link dropdown-toggle"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa-regular fa-user"></i>
        </Link>
        <ul class="dropdown-menu">
          <li>
            <Link class="dropdown-item" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  return component;
}

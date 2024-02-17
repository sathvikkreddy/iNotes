import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Unauthorized from "./Unauthorized";

export default function Profile() {
  const AuthProvider = useContext(AuthContext);
  const { loginState, user } = AuthProvider;

  let content;
  if (loginState) {
    content = (
      <div>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  } else {
    content = <Unauthorized />;
  }

  return content;
}

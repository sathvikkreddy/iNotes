import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const jwtToken = sessionStorage.getItem("jwtToken");

  const [loginState, setLoginState] = useState(jwtToken ? true : false);

  // update user
  const updateUser = async () => {
    const headers = {
      "JWT-Token": sessionStorage.getItem("jwtToken"),
      "Content-Type": "application/json",
    };

    const getUserUrl = "http://localhost:5000/api/auth/getUser";

    try {
      const response = await fetch(getUserUrl, {
        method: "POST", // or 'GET', 'PUT', etc.
        headers: headers,
      });
      const responseBody = await response.json();
      const { _id, name, email } = responseBody;
      setUser({ id: _id, name, email });
      console.log("user is updated");
      return user;
    } catch (error) {
      console.log(error.message);
    }
  };

  const [user, setUser] = useState(
    jwtToken ? async () => await updateUser() : null
  );

  // login
  const login = async (email, password) => {
    const loginUrl = "http://localhost:5000/api/auth/login";
    const requestBody = {
      email,
      password,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(loginUrl, {
        method: "POST", // or 'GET', 'PUT', etc.
        headers: headers,
        body: JSON.stringify(requestBody), // Convert object to JSON string
      });

      const responseBody = await response.json();

      const jwtToken = responseBody.jwtToken;
      if (!jwtToken) {
        return false;
      }
      sessionStorage.setItem("jwtToken", jwtToken);
      console.log(jwtToken);

      await updateUser(jwtToken);

      setLoginState(true);
      console.log("logged in");
      return true;
    } catch (error) {
      console.log(error.message);
    }
  };

  // logout
  const logout = () => {
    try {
      sessionStorage.removeItem("jwtToken");
      setLoginState(false);
      setUser(null);
      console.log("logged out");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ login, loginState, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

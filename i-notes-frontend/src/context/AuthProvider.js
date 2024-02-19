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

    const updateUserUrl = "http://localhost:5000/api/auth/getUser";

    try {
      const response = await fetch(updateUserUrl, {
        method: "POST", // or 'GET', 'PUT', etc.
        headers: headers,
      });
      const responseBody = await response.json();
      const { _id, name, email, notes } = responseBody;
      setUser({ id: _id, name, email, notes });
      console.log("user is updated");
      return user;
    } catch (error) {
      console.log(error.message);
    }
  };

  const [user, setUser] = useState(
    jwtToken ? async () => await updateUser() : null
  );

  // sign up
  const signUp = async (name, email, password) => {
    const loginUrl = "http://localhost:5000/api/auth/signUp";
    const requestBody = {
      name,
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
        return response.status;
      }
      sessionStorage.setItem("jwtToken", jwtToken);
      console.log(jwtToken);

      await updateUser();

      setLoginState(true);
      console.log("signed up");
      return response.status;
    } catch (error) {
      console.log(error.message);
    }
  };

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
        return response.status;
      }
      sessionStorage.setItem("jwtToken", jwtToken);
      console.log(jwtToken);

      await updateUser();

      setLoginState(true);
      console.log("logged in");
      return response.status;
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
    <AuthContext.Provider
      value={{ login, signUp, loginState, user, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

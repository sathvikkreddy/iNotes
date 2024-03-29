import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Profile = () => {
  const AuthProvider = useContext(AuthContext);
  const { user } = AuthProvider;

  return (
    <div className="container text-center">
      <img
        src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
        alt="profile"
        style={{ maxWidth: "30%" }}
      />
      <h2>Name: {user.name}</h2>
      <h2>Email: {user.email}</h2>
    </div>
  );
};

export default Profile;

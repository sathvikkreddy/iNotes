import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();

  // AuthContext
  const AuthProvider = useContext(AuthContext);
  const { signUp, loginState } = AuthProvider;

  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let status;

  useEffect(() => {
    if (loginState) {
      navigate("/");
    }
  }, [loginState, navigate]);

  // handle functions
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onSignUp = async (e, name, email, password) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("entered sign up");
    status = await signUp(name, email, password);
    setIsLoading(false);
    switch (status) {
      case 200:
        setMessage(null);
        break;
      case 401:
        setMessage(
          "Name and email can't be empty, password must be atleast 8 chars long"
        );
        break;
      case 409:
        setMessage("User already exist, try logging in with your email");
        break;
      case 500:
        setMessage("Internal server error occured");
        break;
      default:
        console.log("default case in sign up");
    }
  };

  return (
    !loginState && (
      <div>
        <div className="container text-center">
          <h2>Sign Up</h2>
          <form
            onSubmit={(e) => {
              onSignUp(e, name, email, password);
            }}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={onNameChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={onEmailChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "signing up..." : "sign up"}
            </button>
          </form>
          <p className="my-3">{message}</p>
        </div>
      </div>
    )
  );
}

export default SignUp;

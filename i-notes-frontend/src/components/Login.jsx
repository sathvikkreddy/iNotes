import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  // AuthContext
  const AuthProvider = useContext(AuthContext);
  const { login, loginState } = AuthProvider;

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loginState) {
      navigate("/");
    }
  }, [loginState, navigate]);

  // handle functions
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onLogin = async (e, email, password) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("entered login");
    await login(email, password);
    setIsLoading(false);
    if (loginState) {
      setMessage(null);
    } else {
      setMessage("Invalid Creds");
    }
  };

  return (
    !loginState && (
      <div>
        <div className="container text-center">
          <h2>Login</h2>
          <form
            onSubmit={(e) => {
              onLogin(e, email, password);
            }}
          >
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
              {isLoading ? "Logging in..." : "Submit"}
            </button>
          </form>
          <p>{message}</p>
        </div>
      </div>
    )
  );
}

export default Login;

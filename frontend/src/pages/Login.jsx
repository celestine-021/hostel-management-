import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    /*
      Temporary login.

      We will replace this with your
      real Quart JWT authentication.
    */

    if (
      email === "admin@jkuat.ac.ke" &&
      password === "123456"
    ) {
      localStorage.setItem(
        "token",
        "temporary-demo-token"
      );

      navigate("/dashboard");
    } else {
      setError(
        "Invalid email or password."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <div className="jkuat-logo">
            JKUAT
          </div>

          <h1>
            Hostel Management System
          </h1>

          <p>
            Sign in to your account
          </p>

        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        <div className="login-footer">
          <p>
            Jomo Kenyatta University of Agriculture
            and Technology
          </p>
        </div>

      </div>

    </div>
  );
}

export default Login;
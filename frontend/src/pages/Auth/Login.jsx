import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";
import "./style/styleLogin.css"; // Import your custom CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" checkbox

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || "Invalid email or password!"); // Display error message in a pop-up
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-heading">Sign In</h1>

        <form onSubmit={submitHandler} className="form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              className="remember-me-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="remember-me-label">
              Remember Me
            </label>
          </div>

          <button disabled={isLoading} type="submit" className="login-btn">
            {isLoading ? "Signing In ..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="register-link">
          <p className="register-text">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

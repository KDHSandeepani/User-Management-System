import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.email) {
      alert("Email is required");
      return;
    }
    if (!isValidEmail(values.email)) {
      alert("Enter a valid email address");
      return;
    }
    if (!values.password) {
      alert("Password is required");
      return;
    }
    if (values.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8081/login",
        values
      );

      if (res.data.success) {
        alert(" Login Successful");
        navigate("/dashboard");
      } else {
        alert(" " + res.data.message);
      }
    } catch (err) {
      alert(" Login Failed");
      console.log(err);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h1>User Management System</h1>
          <p>Login to your account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInput}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />

          <button type="submit" className="btn-primary">
            Login
          </button>

          <div className="btn-row">
            <Link to="/register" className="btn-outline">
              Register
            </Link> &nbsp;
            <button type="reset" className="btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
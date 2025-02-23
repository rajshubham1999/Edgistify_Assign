import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import "./Login.css";
import axios from "axios";
import API from '../../apis/axiosInstance'


const Login = () => {
const navigate=useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let newErrors = { email: "", password: "" };
    if (!formData.email.trim()) newErrors.email = "Email is required!";
    if (!formData.password.trim()) newErrors.password = "Password is required!";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await API.post("/api/users/login", formData);
        localStorage.setItem("token", response.data.data); 
        alert("Login successful!");
        navigate("/");
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="account">
          <p className="link">Don't have an account? <Link to="/register">Register</Link></p>
          </div>

          

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

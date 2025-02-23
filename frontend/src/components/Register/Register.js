import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import API from '../../apis/axiosInstance'
const Register = () => {
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const validate = () => {
    let newErrors = { fullName: "", email: "", password: "" };
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required!";
    if (!formData.email.trim()) newErrors.email = "Email is required!";
    if (!formData.password.trim()) newErrors.password = "Password is required!";
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await API.post("/api/users/register", formData);
        alert(response.data.message);
        navigate("/login"); 
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

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
          <p className="link">Already have an account? <Link to="/login">Login</Link></p>
          </div>

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

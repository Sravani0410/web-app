import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).unwrap()
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        console.error('Login error:', err);
      });
  };

  if (status === 'loading') {
    return  (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }
  // if (status === 'failed') {
  //   return <div style={{ color: 'red' }}>Error: {error}</div>;
  // }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <i class="fa-solid fa-envelope"></i>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <i class="fa-solid fa-lock"></i>
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        {status === 'failed' && <div style={{ color: 'red' }}>Error: {error}</div>}
      </form>
    </div>
  );
};

export default Login;

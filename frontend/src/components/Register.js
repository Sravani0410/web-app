import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import "./form.css"

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email:'',
    username: '',
    password: '',
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
    dispatch(registerUser(formData)).unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.error('Registration error:', err);
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
  //   return <div>Error: {error}</div>;
  // }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <div className='form-group'>
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
        <div className='form-group'>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <i class="fa-solid fa-user"></i>
        </div>
        <div className='form-group'>
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
        <button className='btn' type="submit">Register</button>
        {status === 'failed' && <div style={{ color: 'red' }}>Error: {error}</div>}
      </form>
    </div>
  );
};

export default Register;

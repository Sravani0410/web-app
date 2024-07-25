import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const localstoragetoken=localStorage.getItem('token')

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav>
      { localstoragetoken ? (
        <>
        <div className='main-before-login'>
        <h1 className='logo'>Product App</h1> 
        <div className='main-btn'>
          <button onClick={() => navigate('/create')}>Add Product</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
        </div>
        </>
        
      ) : (
       <>
       <div className='main-before-login'>
       <h1 className='logo'>Product App</h1> 
        <div className='main-btn'>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
       </div>
       <h1 className='main-heading'>Please Login or Register</h1>
       </>
      )}
    </nav>
  );
};

export default Navbar;

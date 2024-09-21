/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      dispatch(setUser({ user }));
      alert('Login successful');
      navigate('/');
    } catch (err) {
      setMessage('Please provide a valid email and password!');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex items-start justify-between gap-16'>
        {/* Left Side - Branding */}
        <div className='text-center mt-16'> {/* Adjusted margin here to move branding higher */}
          <Link to='/' className='font-bold text-5xl'> {/* Increased font size */}
            <span className='px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Mern's
            </span>
            Blog
          </Link>
          <p className='text-lg mt-6'> {/* Increased font size for the description */}
            This is a demo project. You can sign up with your email and password .
          </p>
        </div>

        {/* Right Side - Login Box */}
        <div className='max-w-sm bg-white p-10 shadow-lg rounded-lg'>
          <h2 className='text-3xl font-semibold pb-5 text-center'>Please login</h2> {/* Increased font size */}
          <form onSubmit={handleLogin} className='space-y-5'>
            <input
              type="text"
              value={email}
              className='w-full bg-bgPrimary focus:outline-none px-5 py-3 border border-gray-300 rounded-md'
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              className='w-full bg-bgPrimary focus:outline-none px-5 py-3 border border-gray-300 rounded-md'
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {message && <p className="text-red-500">{message}</p>}
            <button
              type="submit"
              disabled={loginLoading}
              className='w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-md'
            >
              Login
            </button>
          </form>
          <p className='my-5 text-center'>
            Don't have an account? 
            <Link to="/register" className='text-indigo-700 italic'> Register </Link> here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

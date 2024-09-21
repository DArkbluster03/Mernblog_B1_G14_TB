import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/features/auth/authApi'; // Ensure correct path

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [registerUser, { isLoading, error }] = useRegisterUserMutation(); // Add useRegisterUserMutation hook
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await registerUser({ username, email, password }).unwrap();
            navigate('/login'); // Redirect to login on successful registration
        } catch (err) {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div className='min-h-screen flex flex-col md:flex-row items-center justify-center mt-16'>
            {/* Header and Description */}
            <div className='flex-1 max-w-lg p-6 md:p-12'>
                <Link to='/' className='font-bold dark:text-white text-4xl'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                        Mern's
                    </span>
                    Blog
                </Link>
                <p className='text-sm mt-5'>
                    This is a demo project. You can sign up with your email and password or with Google.
                </p>
            </div>

            {/* Registration Form */}
            <div className='flex-1 max-w-sm bg-white p-8 mt-8 md:mt-0'>
                <h2 className='text-4xl font-semibold mb-6'>Please Register</h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <input 
                        type="text" 
                        value={username}
                        placeholder='Username'
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-full bg-gray-100 focus:outline-none px-6 py-4 rounded text-lg'
                    />
                    <input 
                        type="email" 
                        value={email}
                        placeholder='Email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full bg-gray-100 focus:outline-none px-6 py-4 rounded text-lg'
                    />
                    <input 
                        type="password" 
                        value={password}
                        placeholder='Password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full bg-gray-100 focus:outline-none px-6 py-4 rounded text-lg'
                    />
                    {message && <p className='text-red-500 text-lg'>{message}</p>}
                    <button
                        type='submit'
                        className='w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md py-3 text-lg'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className='my-6 text-center text-lg'>
                    Already have an account?
                    <Link to="/login" className='text-red-700 italic'> Login</Link>
                    here.
                </p>
            </div>
        </div>
    );
}

export default Register;

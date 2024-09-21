import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';
import { IoClose, IoMenuSharp } from 'react-icons/io5';
import avatarImg from "../assets/commentor.png"

const navLists = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Projects", path: "/projects" },  // Added "Projects" link
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <header className='bg-white py-6 border-b-2'>
            <nav className='container mx-auto flex justify-between px-5'>
                {/* Replaced logo with the new Link to "Mern's Blog" */}
                <div className='flex items-center self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-gray-800 dark:text-white'>
                    <Link to="/" className='flex items-center'>
                        <span className='px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white'>
                            Mern's
                        </span>
                        <span className='ml-2 text-gray-900 dark:text-gray-300'>Blog</span>
                    </Link>
                </div>
                
                <ul className='sm:flex hidden items-center gap-8'>
                    {navLists.map((list, index) => (
                        <li key={index}>
                            <NavLink 
                                to={list.path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {list.name}
                            </NavLink>
                        </li>
                    ))}
                    {user ? (
                        user.role === "user" ? (
                            <li className='flex items-center gap-3'>
                                <img src='/path-to-avatar-img' alt="Avatar" className='w-8 h-8 rounded-full' />
                                <button 
                                    onClick={handleLogout}
                                    className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'
                                >
                                    Logout
                                </button>
                            </li>
                        ) : user.role === "admin" ? (
                            <li className='flex items-center gap-3'>
                                <img src={avatarImg} alt="Avatar" className='w-8 h-8 rounded-full' />
                                <Link to="/dashboard">
                                    <button className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>
                                        Dashboard
                                    </button>
                                </Link>
                            </li>
                        ) : null
                    ) : (
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    )}
                </ul>
                
                <div className='flex items-center sm:hidden'>
                    <button 
                        onClick={toggleMenu}
                        className='flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900'
                    >
                        {isMenuOpen ? <IoClose className='w-6 h-6' /> : <IoMenuSharp className='w-6 h-6' />}
                    </button>
                </div>
            </nav>

            {isMenuOpen && (
                <ul className='fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50'>
                    {navLists.map((list, index) => (
                        <li className='mt-5 px-4' key={index}>
                            <NavLink 
                                onClick={() => setIsMenuOpen(false)}
                                to={list.path}
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                {list.name}
                            </NavLink>
                        </li>
                    ))}
                    <li className='px-4 mt-5'>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            )}
        </header>
    );
};

export default Navbar;

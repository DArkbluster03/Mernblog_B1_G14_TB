import React from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className='border-b-2'>
      <div className='flex items-center self-center whitespace-nowrap text-sm sm:text-xl font-semibold text-gray-800 dark:text-white'>
        <Link to="/" className='flex items-center'>
          <span className='px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white'>
            Mern's
          </span>
          <span className='ml-2 text-gray-900 dark:text-gray-300'>Blog</span>
        </Link>
      </div>

      <div className='flex items-center gap-2 ml-auto'>
        <form className='hidden lg:inline'>
          <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='bg-gray-100 dark:bg-gray-800'
          />
        </form>

        <Button className='w-12 h-10 lg:hidden' color='yellow' pill >
          <AiOutlineSearch />
        </Button>

        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' 
              img={currentUser.profilePicture} 
              rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button
              className='relative w-32 py-2 text-black rounded-lg border border-purple-500 overflow-hidden'
              style={{
                transition: 'background-color 0.3s ease, color 0.3s ease',
                backgroundColor: 'transparent',
              }}
            >
              <span className='absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100'></span>
              <span className='relative z-10 transition-colors group-hover:text-white'>Sign In</span>
            </Button>
          </Link>
        )}
      </div>

      <Navbar.Toggle />

      <Navbar.Collapse className='md:flex md:ml-auto'>
        <CustomNavLink exact={true} to='/'>Home</CustomNavLink>
        <CustomNavLink to='/about'>About</CustomNavLink>
        <CustomNavLink to='/projects'>Projects</CustomNavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}

function CustomNavLink({ to, children, exact }) {
  return (
    <div className='ml-4 md:ml-0'>
      <NavLink
        exact={exact ? 'true' : undefined}
        to={to}
        className={({ isActive }) =>
          `text-sm md:text-base font-medium ${
            isActive ? 'text-indigo-500 dark:text-yellow-300' : 'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
          }`
        }
      >
        {children}
      </NavLink>
    </div>
  );
}

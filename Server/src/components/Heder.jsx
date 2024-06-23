import React from 'react';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Navbar className='border-b-2 border-gray-200'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-lg font-semibold dark:text-white flex items-center'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Mern's
        </span>
        Blog
      </Link>
      <form className='flex-grow ml-4 hidden lg:flex items-center'>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='w-full py-1 px-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-transparent focus:outline-none focus:border-gray-300 dark:focus:border-gray-700'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden ml-4' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2 items-center'>
        <Button
          className='w-12 h-10 hidden sm:inline'
          color='gray'
          pill
        >
          <FaMoon />
        </Button>
        <Link to='/sign-in'>
          <Button gradientDuoTone='purpleToBlue' outline>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className='mt-2 lg:mt-0'>
        <Navbar.Link active={pathname === '/'} as={'div'} className='mr-4'>
          <Link to='/' className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={pathname === '/about'} as={'div'} className='mr-4'>
          <Link to='/about' className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={pathname === '/projects'} as={'div'}>
          <Link to='/projects' className='text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

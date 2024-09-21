import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <footer className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto p-6'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Mern's
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <h3 className='font-semibold mb-2'>About</h3>
              <ul className='space-y-1'>
                <li>
                  <a
                    href='https://www.100jsprojects.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:underline'
                  >
                    100 JS Projects
                  </a>
                </li>
                <li>
                  <a
                    href='/about-us'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:underline'
                  >
                    Mern's Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Follow us</h3>
              <ul className='space-y-1'>
                <li>
                  <a
                    href='https://github.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:underline'
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a href='https://discord.com/channels/@me' className='hover:underline'>
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold mb-2'>Legal</h3>
              <ul className='space-y-1'>
                <li>
                  <a
                    href='https://www.privacypolicyonline.com/'
                    className='hover:underline'
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:underline'>
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='border-t mt-6 pt-4 sm:flex sm:items-center sm:justify-between'>
          <p className='text-sm text-gray-500'>
            &copy; {new Date().getFullYear()} Mern's Blog. All Rights Reserved.
          </p>
          <div className='flex gap-6 sm:mt-0 mt-4'>
            <a href='https://www.facebook.com/' className='text-gray-500 hover:text-gray-900'>
              <BsFacebook />
            </a>
            <a href='https://www.instagram.com/' className='text-gray-500 hover:text-gray-900'>
              <BsInstagram />
            </a>
            <a href='https://x.com/home' className='text-gray-500 hover:text-gray-900'>
              <BsTwitter />
            </a>
            <a href='https://github.com/' className='text-gray-500 hover:text-gray-900'>
              <BsGithub />
            </a>
            <a href='https://dribbble.com/' className='text-gray-500 hover:text-gray-900'>
              <BsDribbble />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

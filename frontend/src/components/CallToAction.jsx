import React from 'react';

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      {/* Text content */}
      <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl'>
          Want to learn more about Mern?
        </h2>
        <p className='text-gray-500 my-2'>
          Checkout these resources with w3Schools
        </p>
        <a 
          href="https://www.w3schools.com/js/" 
          target='_blank' 
          rel='noopener noreferrer' 
          className='bg-gradient-to-r from-purple-400 to-pink-500 text-white py-2 px-4 rounded-tl-xl rounded-bl-none transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-400'
        >
          w3Schools
        </a>
      </div>
      
      {/* Image content */}
      <div className="p-7 flex-1">
        <img 
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" 
          alt="JavaScript" 
        />
      </div>
    </div>
  );
};

export default CallToAction;

import React from 'react';

const SearchBlog = ({ search, handleSearchChange, handleSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='w-full flex'>    
      <input
        type="text"
        placeholder="Hotels with Rooftop Pool Near ..."
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        className='py-2 px-4 mr-5 w-full bg-[#f7f8f9] focus:outline-none focus:border'
      />
      <button
        onClick={handleSearch}
        className='relative px-6 py-2 text-black border border-[#1E73BE] rounded-lg overflow-hidden group'
        style={{
          transition: 'background-color 0.3s ease, color 0.3s ease',
          backgroundColor: 'transparent',
        }}
      >
        <span
          className='absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          style={{ zIndex: 1 }}
        ></span>
        <span
          className='relative z-10 group-hover:text-white transition-colors duration-300'
          style={{ transition: 'color 0.3s ease' }}
        >
          Search
        </span>
      </button>
    </div>
  );
}

export default SearchBlog;

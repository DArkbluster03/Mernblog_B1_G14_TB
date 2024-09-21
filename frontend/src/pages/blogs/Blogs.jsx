import React, { useState } from 'react';
import { useFetchBlogsQuery } from '../../redux/features/blogs/blogsApi';
import SearchBlog from './SearchBlog';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState({ search: '', category: '' });

  // Fetch blogs based on query parameters
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

  // Handle input changes
  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  // Update the query state when filters are applied
  const handleSearch = () => setQuery({ search, category });

  return (
    <div className='mt-16 container mx-auto'>
      {/* Search and Filter Form */}
      <div className='w-full flex flex-col gap-4 mb-8'>
        <SearchBlog
          search={search}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        />
        <div className='flex items-center gap-4'>
          <select
            value={category}
            onChange={handleCategoryChange}
            className='py-2 px-4 bg-[#f7f8f9] focus:outline-none focus:border'
          >
            <option value=''>All Categories</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
            <option value='mongodb'>MongoDB</option>
            <option value='express'>Express</option>
          </select>

          <button
            onClick={handleSearch}
            type='button'
            className='px-6 py-2 text-white bg-teal-500 rounded-lg hover:bg-teal-700 transition-all'
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && <div className='p-5'>Loading...</div>}
      {error && <div className='p-5 text-red-500'>{error.toString()}</div>}

      {/* No Blogs Found */}
      {!isLoading && blogs.length === 0 && (
        <div className='text-center p-5'>
          <p className='text-xl font-semibold text-gray-600'>No posts found</p>
        </div>
      )}

      {/* Blog List */}
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className='relative border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg transition-all group'
          >
            <Link to={`/blogs/${blog._id}`}>
              <img
                src={blog.coverImg}
                alt='blog cover'
                className='h-[260px] w-full object-cover group-hover:scale-110 transition-transform duration-300'
              />
            </Link>
            <div className='p-3 flex flex-col gap-2'>
              <p className='text-lg font-semibold line-clamp-2'>{blog.title}</p>
              <span className='italic text-sm'>{blog.category}</span>
              <Link
                to={`/blogs/${blog._id}`}
                className='absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md group-hover:bottom-0'
              >
                Read article
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;

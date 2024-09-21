import React, { useState } from 'react';
import Hero from './Hero';
import CallToAction from '../../components/CallToAction';
import { useFetchBlogsQuery } from '../../redux/features/blogs/blogsApi';
import { Link } from 'react-router-dom';

const Home = () => {
  const [query, setQuery] = useState({ search: '', category: '' });

  // Fetch recent blogs (you can modify the query as needed to filter the most recent ones)
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

  return (
    <div className='bg-white text-primary container mx-auto mt-8 p-8'>
      <Hero />

      {/* Recent Blogs Section */}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold mb-6'>Recent Blogs</h2>
        {isLoading && <div className='p-5'>Loading...</div>}
        {error && <div>{error.toString()}</div>}

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

      <div className='mt-12'>
        {/* Added margin-top for spacing */}
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;

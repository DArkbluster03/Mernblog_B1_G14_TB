import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiUsers } from "react-icons/fi";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri"; // Added import for RiAdminLine
import { useFetchBlogsQuery } from '../../../redux/features/blog/blogsApi';
import { useGetCommentsQuery } from '../../../redux/features/comments/commentApi';
import { useGetUsersQuery } from '../../../redux/features/auth/authApi';  // Ensure this path is correct

const Dashboard = () => {
  const [query, setQuery] = useState({ search: '', category: '' });
  const { user } = useSelector((state) => state.auth);
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  const { data: comments = [] } = useGetCommentsQuery();
  const { data: users = [] } = useGetUsersQuery();
  const adminCounts = users?.filter(user => user.role === 'admin').length || 0; // Fixed admin count calculation

  return (
    <>
      {isLoading && (<div>Loading ....</div>)}
      <div className='space-y-6'>
        <div className='bg-bgPrimary p-5'>
          <h1>Hi, {user?.username}!</h1>
          <p>Welcome to the admin dashboard</p>
        </div>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
              <FiUsers className='size-8 text-indigo-600' />
              <p>{users.length} Users</p>
            </div>
            <div className='bg-red-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
              <FaBlog className='size-8 text-red-600' />
              <p>{blogs.length} Blogs</p>
            </div>
            <div className='bg-lime-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
              <RiAdminLine className='size-8 text-lime-600' />
              <p>{adminCounts} Admin{adminCounts !== 1 ? 's' : ''}</p>
            </div>
            <div className='bg-orange-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
              <FaRegComment className='size-8 text-orange-600' />
              <p>{comments.length} Comments</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

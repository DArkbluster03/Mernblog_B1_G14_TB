import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { useFetchBlogsQuery } from "../../../redux/features/blogs/blogsApi";
import { useGetUserQuery } from "../../../redux/features/auth/authApi";
import { useGetCommentsQuery } from "../../../redux/features/comments/commentsApi";
import BlogsChart from "./BlogsChart";
import UserAdminChart from "./UserAdminChart";
import CommentChart from "./CommentChart";

const Dashboard = () => {
  const [query, setQuery] = useState({ search: '', category: '' });
  
  // Refetch data on mount or when query changes
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query, {
    refetchOnMountOrArgChange: true,  // Ensure fresh data is fetched
  });
  const { data: users = [] } = useGetUserQuery();
  const { data: comments = [] } = useGetCommentsQuery();
  const { user } = useSelector((state) => state.auth);

  // Calculate the number of "admin" roles
  const adminCount = users.filter(user => user.role === "admin").length;

  // Logging to verify fetched blogs
  console.log(blogs); // Check if the blogs array contains correct data

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="space-y-6">
        <div className="bg-bgPrimary p-5">
          <h1>Hi, {user.username}!</h1>
          <p>Welcome to the admin dashboard</p>
          <p>
            Here you can publish posts,update posts and do other admin related tasks
            
          </p>
        </div>

        {/* Cards grid */}
        <div className="flex flex-col md:flex-row justify-between gap-8 pt-8">
          <div className="bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FiUsers className="size-8 text-indigo-600" />
            <p>{users.length} Users</p>
          </div>
          <div className="bg-red-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FaBlog className="size-8 text-red-600" />
            <p>{blogs.length} Blogs</p> {/* Display correct blogs count */}
          </div>
          <div className="bg-lime-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <RiAdminLine className="size-8 text-lime-600" />
            <p>{adminCount} Admin{adminCount !== 1 ? 's' : ''}</p>
          </div>
          <div className="bg-orange-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FaRegComment className="size-8 text-orange-600" />
            <p>{comments.totalComments || 0} Comments</p>
          </div>
        </div>

        {/* User vs Admin pie chart */}
        <div className="pt-5 pb-5">
          <UserAdminChart totalUsers={users.length} adminCount={adminCount} />
        </div>

        {/* Comments chart */}
        <div className="pt-5 pb-5">
          <CommentChart totalComments={comments.totalComments || 0} />
        </div>

        {/* Blogs chart */}
        <div className="pt-5 pb-5">
          <BlogsChart blogs={blogs}/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from 'react';
import { useFetchBlogByIdQuery } from '../../../redux/features/blog/blogsApi';
import SingleBlogCard from './SingleBlogCard';
// Updated path for CommentCard
import RelatedBlogs from './RelatedBlogs';
import { useParams } from 'react-router-dom';
import CommentCard from '../comments/commentCard';


const SingleBlog = () => {
    const { id } = useParams();
    const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id);
    
    return (
        <div className='text-primary container mx-auto mt-8'>
            <div> 
                {isLoading && (
                    <div className='text-center py-4'>
                        <p>Loading...</p>
                        {/* You might want to add a spinner or loader here */}
                    </div>
                )}
                {error && (
                    <div className='text-center py-4 text-red-600'>
                        <p>Something went wrong. Please try again later.</p>
                        {/* Optionally, you could add a retry button here */}
                    </div>
                )}
                {blog?.post && (
                    <div className='flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8'>
                        <div className='lg:w-2/3 w-full'>
                            <SingleBlogCard blog={blog.post} />
                          <CommentCard comments={blog?.comments} />
                        </div>
                        <div className='bg-white lg:w-1/2 w-full'>
                            <RelatedBlogs />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleBlog;

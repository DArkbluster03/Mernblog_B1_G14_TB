// components/UpdatePost.js
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import EditorJS from '@editorjs/editorjs';
import { useNavigate, useParams } from "react-router-dom";
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from '../../../redux/features/blog/blogsApi';

const UpdatePost = () => {
    const { id } = useParams(); // To get post ID from the URL
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    const [updateBlog, { isLoading }] = useUpdateBlogMutation();
    
    const { user } = useSelector((state) => state.auth);
    const { data: blog={}, error, isLoading: isPostLoading, refetch } = useFetchBlogByIdQuery(id); // Fetching the post to edit
    const navigate = useNavigate();

    useEffect(() => {
        if (blog.post) {
            // Populate fields with the current post data
            setTitle(blog.post.title);
            setCoverImg(blog.post.coverImg);
            setMetaDescription(blog.post.description);
            setCategory(blog.post.category);
            setRating(blog.post.rating);

            // Initialize EditorJS and load post content
            const editor = new EditorJS({
                holder: 'editorjs',
                onReady: () => {
                    editorRef.current = editor;
                    editor.blocks.render({ blocks: blog.post.content }); // Load post content into editor
                },
                autofocus: true,
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                },
                data: blog.post.content
            });

            return () => {
                editorRef.current.destroy();
                editorRef.current = null;
            };
        }
    }, [blog]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const content = await editorRef.current.save();
            const updatedPost = {
                title: title || blog.post.title,
                coverImg: coverImg || blog.post.coverImg,
                content,
                description: metaDescription || blog.post.description,
                category: category || blog.post.category,
                author: user?._id,
                rating: rating || blog.post.rating
            };
            const response = await updateBlog({ id, ...updatedPost }).unwrap();
            console.log(response);
            alert("Blog updated successfully!");
            refetch();
            navigate('/dashboard');
        } catch (error) {
            console.log("Failed to update post", error);
            setMessage("Failed to update the post. Please try again.");
        }
    };

    if (isPostLoading) {
        return <p>Loading post...</p>; // Show a loading state while fetching the post
    }

    return (
        <div className='bg-white md:p-8 p-2'>
            <h2 className='text-2xl font-semibold'>Edit or Update Post</h2>
            <form onSubmit={handleSubmit} className='space-y-5 pt-8'>
                <div className='space-y-4'>
                    <label>Blog Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                        placeholder='Enter blog title...'
                        required
                    />
                </div>

                <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
                    <div className='md:w-2/3 w-full'>
                        <p className='font-semibold text-xl mb-5'>Content Section</p>
                        <p className='text-xs italic'>Write your post below...</p>
                        <div id='editorjs' className='border p-4'></div>
                    </div>

                    <div className='md:w-1/3 w-full border p-5 space-y-5'>
                        <p className='text-xl font-semibold'>Post Details</p>

                        <div className='space-y-4'>
                            <label>Blog Cover:</label>
                            <input
                                type="text"
                                value={coverImg}
                                onChange={(e) => setCoverImg(e.target.value)}
                                className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='Enter blog cover URL...'
                                required
                            />
                        </div>

                        <div className='space-y-4'>
                            <label>Description:</label>
                            <textarea
                                rows="4"
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='Enter blog description...'
                                required
                            />
                        </div>

                        <div className='space-y-4'>
                            <label>Category:</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='Enter blog category...'
                                required
                            />
                        </div>

                        <div className='space-y-4'>
                            <label>Rating:</label>
                            <input
                                type="number"
                                min="0"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='Enter blog rating...'
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className='bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md'
                        >
                            {isLoading ? 'Updating...' : 'Update Post'}
                        </button>
                    </div>
                </div>
            </form>
            {message && <p className="text-red-500">{message}</p>}
        </div>
    );
};

export default UpdatePost;

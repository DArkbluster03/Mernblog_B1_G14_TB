import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import EditorJS from '@editorjs/editorjs';
import { useNavigate } from "react-router-dom";
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { usePostBlogMutation } from '../../../redux/features/blog/blogsApi';

const AddPost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [postBlog, { isLoading }] = usePostBlogMutation();

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        editorRef.current = editor;
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
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contentData = await editorRef.current.save();

      // Check if title or content is missing
      if (!title || !contentData.blocks.length) {
        setMessage("Title and content are required.");
        return;
      }

      const newPost = {
        title,
        coverImg,
        content: contentData, // Make sure content is set properly
        description: metaDescription,
        category,
        author: user?._id,
        rating
      };

      const response = await postBlog({ newBlog: newPost }).unwrap();
      console.log(response);
      alert("Blog is posted successfully!");
      navigate('/');
    } catch (error) {
      console.log("Failed to submit post", error);
      setMessage("Failed to submit the post. Please try again.");
    }
  };

  return (
    <div className='bg-white md:p-8 p-2'>
      <h2 className='text-2xl font-semibold'>Create New Post</h2>
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
                placeholder='Enter cover image URL...'
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
                placeholder='Enter post category...'
                required
              />
            </div>

            <div className='space-y-4'>
              <label>Meta Description:</label>
              <input
                type="text"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                placeholder='Enter meta description...'
                required
              />
            </div>

            <div className='space-y-4'>
              <label>Rating:</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min={0}
                max={5}
                className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                placeholder='Enter post rating (0-5)...'
                required
              />
            </div>

            <div className='space-y-4'>
              <label>Author:</label>
              <input
                type="text"
                value={user.username}
                className='w-full bg-bgPrimary focus:outline-none px-5 py-3'
                readOnly
                placeholder='Author'
              />
            </div>
          </div>
        </div>

        {message && <p className='text-red-500'>{message}</p>}

        <button
          type='submit'
          disabled={isLoading}
          className={`w-full bg-primary hover:bg-indigo-500 text-white font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Posting...' : 'Add new blog'}
        </button>
      </form>
    </div>
  );
};

export default AddPost;

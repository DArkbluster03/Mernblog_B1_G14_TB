import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { usePostCommentMutation } from '../../../redux/features/comments/commentApi';
import { useFetchBlogByIdQuery } from '../../../redux/features/blog/blogsApi'; // Assuming this import is correct

const PostAComment = () => {
    const { id } = useParams();
    const [comment, setComment] = useState('');
    const { user } = useSelector((state) => state.auth);
    const [postComment] = usePostCommentMutation();
    const { refetch } = useFetchBlogByIdQuery(id, { skip: !id });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please log in to post a comment.');
            navigate("/login");
            return;
        }

        const newComment = {
            comment: comment,
            user: user?._id,
            postId: id
        };

        try {
            const response = await postComment(newComment).unwrap();
            alert('Comment posted successfully!');
            setComment('');
            refetch();
        } catch (error) {
            alert("Failed to post comment. Please try again.");
        }
    };

    return (
        <div className='mt-8'>
            <h3 className='text-lg font-medium mb-8'>
                Leave a Comment
            </h3>
            <form onSubmit={handleSubmit}>
                <textarea 
                    name="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    cols="30"
                    rows="10"
                    placeholder='Share your thoughts...'
                    className='w-full bg-bgPrimary focus:outline-none p-5'
                />
                <button type='submit' className='w-full bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default PostAComment;

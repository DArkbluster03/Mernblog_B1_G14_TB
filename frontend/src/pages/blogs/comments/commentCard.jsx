import React from 'react';
import { formatDate } from '../../../utils/formatDate';
import commentIcon from '../../../assets/commentor.png'; // Ensure this path is correct

import { useSelector } from 'react-redux';
import PostAComment from './PostAComment';

const commentCard = ({ comments }) => {
  const user=useSelector((state)=>state.auth.user);
  return (
    <div className="my-6 bg-white p-8">
      {comments?.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium">All Comments</h3>
          <div>
            {comments.map((comment, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center">
                  <img src={commentIcon} alt="Comment Icon" className="h-14 mr-4" />
                  <div>
                    <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                      {comment?.user?.username}
                    </p>
                    <p className="text-[12px] italic">{formatDate(comment.createdAt)}</p>
                  </div>
                </div>
                <div className="text-gray-600 mt-5 border p-8">
                  <p className="md:w-4/5">{comment?.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
      <div className='text-lg font-medium'>No Comments Found!</div>
      )}
      <PostAComment/>
      
    </div>
  );
};

export default commentCard;

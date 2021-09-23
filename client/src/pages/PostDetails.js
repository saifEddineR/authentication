import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPosts,
  getSinglePost,
  updatePost,
  updatePostComment,
  updatePostImage,
  updatePostLike,
} from '../redux/postSlice';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

const PostDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [commentInfo, setCommentInfo] = useState('');
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getSinglePost(match.params.id));
  }, []);
  const { post, loading } = useSelector((state) => state.post);

  const checkLike = (post) => {
    return post.likes.some((likeId) => likeId == user.userInfo._id);
  };
  const handleUpdate = (e) => {
    setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
  };
  const handleUpdateSubmit = (e, postId) => {
    e.preventDefault();
    dispatch(updatePost({ id: postId, data: updatedInfo }));
  };
  const handleUpdateImage = (e, postId) => {
    dispatch(updatePostImage({ id: postId, file: e.target.files[0] }));
  };
  const handleLike = (postId, post) => {
    dispatch(updatePostLike(postId));
  };
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    dispatch(updatePostComment({ postId, desc: commentInfo }));
  };
  return (
    <div>
      {post && post.title && (
        <>
          <h4>{post.owner.fullName}</h4>
          <h2>{post.title} </h2>
          <img src={post.image.imageURL} alt='workshop' width='200' />
          <p>{post.description}</p>
          <button
            style={
              checkLike(post) ? { backgroundColor: 'red' } : { backgroundColor: 'white' }
            }
            onClick={() => handleLike(post._id)}
          >
            like
          </button>
          {post.likes.length}
          <br />
          {user.userInfo._id === post.owner._id && (
            <>
              <input
                type='file'
                name='image'
                onChange={(e) => handleUpdateImage(e, post._id)}
              />
              <form>
                <input
                  type='text'
                  name='title'
                  placeholder={post.title}
                  onChange={handleUpdate}
                />
                <input
                  type='text'
                  name='description'
                  placeholder={post.description}
                  onChange={handleUpdate}
                />
                <button type='submit' onClick={(e) => handleUpdateSubmit(e, post._id)}>
                  Update
                </button>
              </form>
            </>
          )}
          <br />
          <br />
          <form>
            <input type='text' onChange={(e) => setCommentInfo(e.target.value)} />
            <button type='submit' onClick={(e) => handleCommentSubmit(e, post._id)}>
              Add
            </button>
          </form>
          {post.comments.map((comment) => {
            // const date = comment.createdAt.split('T')[0];
            const newDate = new Date(comment.createdAt).toLocaleDateString();
            const time = new Date(comment.createdAt).toLocaleTimeString();
            return (
              <>
                <h3>{comment.commentOwner.fullName}</h3>
                <p>{comment.desc} </p>
                <span>{`${newDate} ${time}`}</span>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default PostDetails;

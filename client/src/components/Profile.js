import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNewPost,
  getPosts,
  updatePost,
  updatePostImage,
  updatePostLike,
} from '../redux/postSlice';

const Profile = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  useEffect(() => {
    if (!user.isAuth) {
      history.push('/login');
    } else {
      dispatch(getPosts());
    }
  }, [user.isAuth]);
  const [postInfo, setPostInfo] = useState({});
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [file, setFile] = useState({});

  const checkLike = (post) => {
    /* const like = post.likes.find((likeId) => likeId == user.userInfo._id);
    console.log(like);
    if (like) {
      return true;
    } else {
      return false;
    } */
    return post.likes.some((likeId) => likeId == user.userInfo._id);
  };
  const handleChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewPost({ postInfo, file }));
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
  return (
    <div>
      <form>
        <input type='text' name='title' onChange={handleChange} placeholder='title' />
        <input
          type='text'
          name='description'
          onChange={handleChange}
          placeholder='description'
        />
        <input type='file' name='file' onChange={(e) => setFile(e.target.files[0])} />
        <button type='submit' onClick={handleSubmit}>
          add post
        </button>
      </form>
      <br />
      <div>
        {post.posts &&
          post.posts.map((post) => (
            <>
              <h4>{post.owner.fullName}</h4>
              <h2>{post.title} </h2>
              <img src={post.image.imageURL} alt='workshop' width='200' />
              <p>{post.description}</p>
              <button
                style={
                  checkLike(post)
                    ? { backgroundColor: 'red' }
                    : { backgroundColor: 'white' }
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
                    <button
                      type='submit'
                      onClick={(e) => handleUpdateSubmit(e, post._id)}
                    >
                      Update
                    </button>
                  </form>
                </>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Profile;

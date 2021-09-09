import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNewPost, getPosts } from '../redux/postSlice';

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
  const [file, setFile] = useState({});
  const handleChange = (e) => {
    setPostInfo({ ...postInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewPost({ postInfo, file }));
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
              <h2>{post.title} </h2>
              <img src={post.image.imageURL} alt='workshop' />
              <p>{post.description}</p>
            </>
          ))}
      </div>
    </div>
  );
};

export default Profile;

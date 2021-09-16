import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addNewPost = createAsyncThunk(
  'posts/addnewpost',
  async (info, { rejectWithValue, dispatch }) => {
    console.log(info);
    const formData = new FormData();
    formData.append('picture', info.file);
    formData.append('info', JSON.stringify(info.postInfo));
    try {
      const res = await axios.post('/posts/addpost', formData, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getPosts());
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.errors.password.msg
      );
    }
  }
);
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/posts/update/${info.id}`, info.data, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getPosts());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updatePostImage = createAsyncThunk(
  'posts/updatePostImage',
  async (info, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('postImg', info.file);
      const res = await axios.put(`/posts/uploadimg/${info.id}`, formData, {
        headers: { token: localStorage.getItem('token') },
      });
      dispatch(getPosts());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updatePostLike = createAsyncThunk(
  'posts/updatePostLike',
  async (postId, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(
        `/posts/likes/${postId}`,
        {},
        {
          headers: { token: localStorage.getItem('token') },
        }
      );
      dispatch(getPosts());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.get('/posts');
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    postErrors: null,
    postsErrors: null,
    post: {},
  },
  extraReducers: {
    [addNewPost.pending]: (state) => {
      state.loading = true;
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
      state.postErrors = null;
    },
    [addNewPost.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.postsErrors = null;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});

export default postSlice.reducer;

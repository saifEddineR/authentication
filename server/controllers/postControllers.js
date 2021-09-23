const cloudinary = require('../helpers/cloudinary');
const Post = require('../models/postSchema');
/**
 *@param<string>
 */
const addPost = async (req, res) => {
  try {
    const newBody = JSON.parse(req.body.info);
    const imageInfo = await cloudinary.uploader.upload(req.file.path);
    const newPost = await Post.create({
      title: newBody.title,
      description: newBody.description,
      owner: req.personId,
      image: { imageURL: imageInfo.url, public_id: imageInfo.public_id },
    });
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('owner', '-password');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('owner', '-password -__v')
      .populate('comments.commentOwner', '-password -__v');
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { description, title } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      description,
      title,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updatePostImage = async (req, res) => {
  try {
    const imageInfo = await cloudinary.uploader.upload(req.file.path);
    const existPost = await Post.findById(req.params.id);
    cloudinary.uploader.destroy(existPost.image.public_id);
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
      image: { imageURL: imageInfo.url, public_id: imageInfo.public_id },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const postLikes = async (req, res) => {
  try {
    const postId = req.params.id;
    const existPost = await Post.findById(postId);
    const existLike = await existPost.likes.find((like) => like == req.personId);
    if (existLike) {
      const updatedPost = await Post.findByIdAndUpdate(postId, {
        $pull: { likes: req.personId },
      });
      res.json(updatedPost);
    } else {
      const updatedPost = await Post.findByIdAndUpdate(postId, {
        $push: { likes: req.personId },
      });
      res.json(updatedPost);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const addComment = async (req, res) => {
  try {
    const { desc } = req.body;
    const newPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: { commentOwner: req.personId, desc } },
      },
      { new: true }
    )
      .populate('owner')
      .populate('comments.commentOwner', '-password -__v');
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  addPost,
  getPosts,
  getSinglePost,
  updatePost,
  updatePostImage,
  postLikes,
  addComment,
};

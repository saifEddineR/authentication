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
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { addPost, getPosts };

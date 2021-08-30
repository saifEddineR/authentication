const Post = require('../models/postSchema');

const addPost = async (req, res) => {
  try {
    const { description, title } = req.body;
    const newPost = await Post.create({ title, description, owner: req.personId });
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { addPost };

const express = require('express');
const { addPost, getPosts } = require('../controllers/postControllers');
const authMiddleware = require('../middleware/authMiddleware');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const router = express.Router();
const cloudinary = require('../helpers/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'DEV',
  },
});

const upload = multer({ storage });

router.post('/addpost', upload.single('picture'), authMiddleware, addPost);
router.get('/', getPosts);

module.exports = router;

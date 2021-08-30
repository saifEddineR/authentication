const express = require('express');
const { addPost } = require('../controllers/postControllers');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/addpost', authMiddleware, addPost);

module.exports = router;

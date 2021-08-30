const express = require('express');
const { registerController, loginController } = require('../controllers/userController');
const router = express.Router();
const { body } = require('express-validator');

router.post(
  '/register',
  body('email', 'invalid email').isEmail(),
  body('password', 'password must be 6 character minimum').isLength({ min: 6 }),
  registerController
);

router.post('/login', loginController);

module.exports = router;

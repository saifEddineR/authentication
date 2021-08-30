const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() });
    }
    const { email, password, fullName } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400).json({ msg: 'user already exist' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, fullName, password: hashedPassword });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '30d' }
    );
    res.json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) res.status(400).json({ message: 'you must register first !' });
    const validatePassword = await bcrypt.compare(password, existUser.password);
    if (!validatePassword)
      res.status(400).json({ message: 'Wrong password ! \n Try again!' });
    const token = jwt.sign(
      { id: existUser._id, email: existUser.email },
      process.env.SECRET_KEY
    );
    res.json({ user: existUser, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { registerController, loginController };

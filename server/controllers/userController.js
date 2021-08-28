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
      { fullName: newUser.fullName, email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: '30d' }
    );
    res.json({ newUser, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerController };

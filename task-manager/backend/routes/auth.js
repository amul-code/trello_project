const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', {
      expiresIn: '1h',
    });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

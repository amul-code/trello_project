const express = require('express');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access denied');
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

router.post('/tasks', authMiddleware, async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.userId });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/tasks', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.send(tasks);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send('Task deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

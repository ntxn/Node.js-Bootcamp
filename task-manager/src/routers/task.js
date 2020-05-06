const express = require('express');
const Task = require('../models/task');
const validateFields = require('../utils/validateFields');

const router = new express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const tasks = await Task.find();
      res.send(tasks);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post(async (req, res) => {
    const task = new Task(req.body);
    try {
      await task.save();
      res.status(201).send(task);
    } catch (err) {
      res.status(400).send(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);

      if (!task) return res.status(404).send();
      res.send(task);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .patch(async (req, res) => {
    if (!validateFields(req.body, ['description', 'completed']))
      return res.status(400).send({ error: 'Invalid update fields' });

    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedTask) return res.status(404).send();
      res.status(200).send(updatedTask);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);

      if (!task) return res.status(404).send();
      res.send(task);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;

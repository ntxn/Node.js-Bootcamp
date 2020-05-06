const express = require('express');
const User = require('../models/user');
const validateFields = require('../utils/validateFields');

const router = new express.Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .post(async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) return res.status(404).send();
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .patch(async (req, res) => {
    if (!validateFields(req.body, ['name', 'email', 'password', 'age']))
      return res.status(400).send({ error: 'Invalid update fields' });

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedUser) return res.status(404).send();
      res.status(200).send(updatedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) return res.status(404).send();
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router;

const express = require('express');
const User = require('../models/user');

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
    const updateFields = Object.keys(req.body);
    const allowedFields = ['name', 'email', 'password', 'age'];
    const areValidFields = updateFields.every((update) =>
      allowedFields.includes(update)
    );
    if (!areValidFields)
      return res.status(400).send({ error: 'Invalid update fields' });

    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send();

      updateFields.forEach((field) => {
        user[field] = req.body[field];
      });

      await user.save();
      res.status(200).send(user);
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

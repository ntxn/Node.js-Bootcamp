const User = require('../models/user');

const getProfile = (req, res) => res.send(req.user);

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
};

module.exports = {
  getProfile,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  login,
};

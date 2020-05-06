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

const updateUser = async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedFields = ['name', 'email', 'password', 'age'];
  const areValidFields = updateFields.every((update) =>
    allowedFields.includes(update)
  );
  if (!areValidFields)
    return res.status(400).send({ error: 'Invalid update fields' });

  try {
    updateFields.forEach((field) => {
      req.user[field] = req.body[field];
    });

    await req.user.save();

    const data = { user: req.user };

    if (updateFields.includes('password')) {
      req.user.tokens = [];
      data.token = await req.user.generateAuthToken();
    }

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
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

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  getProfile,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
  logoutAll,
};

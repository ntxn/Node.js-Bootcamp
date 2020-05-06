const Task = require('../models/task');

const getAllTasks = async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate('tasks').execPopulate();
    res.send(req.user.tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createTask = async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateTask = async (req, res) => {
  const updateFields = Object.keys(req.body);
  const allowedFields = ['description', 'completed'];
  const areValidFields = updateFields.every((update) =>
    allowedFields.includes(update)
  );
  if (!areValidFields)
    return res.status(400).send({ error: 'Invalid update fields' });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();

    updateFields.forEach((field) => {
      task[field] = req.body[field];
    });

    await task.save();
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };

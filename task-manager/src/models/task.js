const mongoose = require('mongoose');
const validator = require('validator');

const Task = mongoose.model('Task', {
  description: {
    type: String,
    trim: true,
    required: [true, 'Please provide a task description'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;

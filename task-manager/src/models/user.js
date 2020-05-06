const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email is invalid'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    trim: true,
    minlength: [6, 'Password has to have at least 6 characters'],
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error(`Your password can't contain 'password'`);
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new Error('Unable to login');
  return user;
};

// Hash the plain text password before saving to db
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 10);

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

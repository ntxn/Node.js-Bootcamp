const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = new express.Router();

router
  .route('/')
  .get(auth, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post('/login', userController.login);

module.exports = router;

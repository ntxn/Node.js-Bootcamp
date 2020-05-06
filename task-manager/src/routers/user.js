const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = new express.Router();

router.post('/', userController.createUser);
router.post('/login', userController.login);

router.use(auth);

router.post('/logout', userController.logout);
router.post('/logoutAll', userController.logoutAll);

router
  .route('/me')
  .get(userController.getProfile)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

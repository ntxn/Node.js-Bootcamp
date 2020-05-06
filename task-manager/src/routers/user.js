const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = new express.Router();

router.route('/').post(userController.createUser);

router
  .route('/me')
  .get(auth, userController.getProfile)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);
router.post('/logoutAll', auth, userController.logoutAll);

module.exports = router;

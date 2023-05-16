const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.put('/:id', userController.updateUser);

module.exports = router;

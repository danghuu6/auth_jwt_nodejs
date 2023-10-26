const express = require('express');
const router = express.Router();

const verifyToken = require('./../middleware/verifyToken');

const userController = require('./../controller/UserController')

router.get('/users', verifyToken, userController.getAllUser);

module.exports = router;

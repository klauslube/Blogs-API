const express = require('express');
const userController = require('../controllers/userController');
const { userMiddleware } = require('../middlewares/validations');
const { authToken } = require('../helper/authToken');

const route = express.Router();

route.post('/user', userMiddleware, userController.create);
route.get('/user', authToken, userController.getAll);
route.get('/user/:id', authToken, userController.getById);
route.delete('/user/me', authToken, userController.delete);

module.exports = route;
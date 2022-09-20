const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { authToken } = require('../helper/authToken');

const route = express.Router();

route.post('/categories', authToken, categoriesController.create);
route.get('/categories', authToken, categoriesController.getAll);

export default route;

const express = require('express');
const postController = require('../controllers/postController');
const { authToken } = require('../helper/authToken');

const route = express.Router();

route.get('/post/search', authToken, postController.search);
route.post('/post', authToken, postController.create);
route.get('/post', authToken, postController.getAll);
route.get('/post/:id', authToken, postController.getById);
route.put('/post/:id', authToken, postController.update);
route.delete('/post/:id', authToken, postController.delete);

export default route;
const express = require('express');
const { loginController } = require('./controllers/loginController');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { userMiddleware } = require('./middlewares/validations');
const userController = require('./controllers/userController');
const categoriesController = require('./controllers/categoriesController');
const postController = require('./controllers/postController');
const { authToken } = require('./helper/authToken');
// const { categoryValidation } = require('./middlewares/categoryValidation');
require('express-async-errors');
// ...

const app = express();

app.use(express.json());

app.post('/login', loginController);

app.post('/user', userMiddleware, userController.create);
app.get('/user', authToken, userController.getAll);
app.get('/user/:id', authToken, userController.getById);

app.post('/categories', authToken, categoriesController.create);
app.get('/categories', authToken, categoriesController.getAll);

app.post('/post', authToken, postController.create);
app.get('/post', authToken, postController.getAll);
app.get('/post/:id', authToken, postController.getById);

app.use(errorMiddleware);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

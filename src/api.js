const express = require('express');
const { loginController } = require('./controllers/loginController');
const errorMiddleware = require('./middlewares/errorMiddleware');
const { userMiddleware } = require('./middlewares/validations');
const userController = require('./controllers/userController');
require('express-async-errors');
// ...

const app = express();

app.use(express.json());

app.post('/login', loginController);
app.post('/user', userMiddleware, userController.create);
app.use(errorMiddleware);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

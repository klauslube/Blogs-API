require('dotenv').config();
const app = require('./api');
const loginController = require('./controllers/loginController');
const emailValidate = require('./middlewares/emailValidate');
const nameValidate = require('./middlewares/nameValidate');
const passwordValidate = require('./middlewares/passwordValidate');
const userController = require('./controllers/userController');
const errorMiddleware = require('./middlewares/errorMiddleware');
// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginController);
app.post('/user', emailValidate, passwordValidate, nameValidate, userController.create);
app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));

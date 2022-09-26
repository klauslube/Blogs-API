const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('express-async-errors');

const loginRoute = require('./routes/login.route');
const userRoute = require('./routes/user.route');
const categoriesRoute = require('./routes/categories.route');
const postRoute = require('./routes/post.route');

const app = express();

app.use(express.json());

app.use(loginRoute);
app.use(userRoute);
app.use(categoriesRoute);
app.use(postRoute);

app.use(errorMiddleware);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

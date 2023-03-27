const express = require('express');
const logger = require('morgan');
const port = 9000;
const app = express();

app.use(logger('dev'));

// an example middleware function
const middleware_function = function (req, res, next) {
  console.log('middleware_function');
  next();
};

app.use(middleware_function);
app.get('/', (req, res) => res.send('Hello World!'));

const wiki = require('./wiki.js');
app.use('/wiki', wiki);

app.listen(port, () => console.log(`listening on port ${port}!`));

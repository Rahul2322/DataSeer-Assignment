require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const app = express();
const models = require('./models');
const PORT = process.env.PORT



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  models.errorLogger.create({
    message: JSON.stringify(err.stack),
    url: req.url,
    method: req.method,
    host: req.hostname,
    body: JSON.stringify(req.body)
  })
 
  res.status(500).send({ message: "something went wrong" });
});


module.exports = app;

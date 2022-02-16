const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const Routers = require('./server/entities/index');
const config = require('./server/store/config');
const applyPassportStrategy = require('./server/store/passport');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
applyPassportStrategy(passport);

app.use('/api/auth', Routers.AuthRouter);
app.use('/api/courses', Routers.CoursesRouter);
app.use('/api/lessons', Routers.LessonsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const {port, mongoDBUri, mongoHostName} = config.env;
app.listen(port, () => {
  console.log('сервер запущен');
  mongoose
      .connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
        console.log('BD подключена');
      } );
  // .then(() => {
  //
  // });
});
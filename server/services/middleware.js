//MiddleWare
var bodyParser = require('body-parser');
var auth = require('./auth'); // ./auth does some stuff to set up passport
var morgan = require('morgan');
var session = require('express-session');
var ejs = require('ejs');

module.exports = function (app, express) {
  app.set('view engine', 'ejs');
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(auth.passport.initialize());
  app.use(auth.passport.session());
};

//MiddleWare
var bodyParser = require('body-parser');
var auth = require('./auth'); // ./auth does some stuff to set up passport
var morgan = require('morgan');
var session = require('express-session');

module.exports = function (app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // @!@!@! TODO: change the header for deployment*******************************************************
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Pass to next layer of middleware
    next();
});

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(auth.passport.initialize());
  app.use(auth.passport.session());

  app.use(express.static(__dirname + '/../../client/public'));
};

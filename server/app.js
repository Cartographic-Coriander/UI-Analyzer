var express = require('express');
var passport = require('passport');
var cookieParser = require('cookieParser');
var bodyParser = require('bodyParser');

var app = express();

app.configure(function(){
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  // passport config here
  app.use(express.session({ secret: 'alhambra chateau von deutschland my lady'});

  // passport initialization
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

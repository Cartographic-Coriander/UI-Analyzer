var path = require('path');
var bodyParser = require('body-parser');
var authService = require('./services/auth.js');

module.exports = function (app, express) {  

  app.post('/signup', authService.signup);
  app.post('/signin', authService.signin);
  app.get('/signin', authController.checkAuth);

};

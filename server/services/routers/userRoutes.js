var auth = require('../auth');

module.exports = function(app, express) {
  app.post('/api/users/signin', auth.authenticate, function (req, res) {
    res.json(req.userToken);
  });

  app.post('/api/users/signup', auth.createUser, auth.authenticate, function (req, res) {
    res.json(req.userToken);
  });

  app.delete('/api/users/signin', auth.signout);
};
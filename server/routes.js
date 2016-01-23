var auth = require('./services/auth');

 // inputs:
  // in data field:
  //    user: 
  //      username: the useraname
  //      password: the password
  // output:
  // in data field:
  //    message: if failure, reason for failure
  app.post('/api/users/signin', auth.authenticate, function (req, res) {
    res.json({ message: "Authenticated" });
  });
  app.post('/api/users/signup', auth.createUser, auth.authenticate, function (req, res) {
    res.json({ message: "Authenticated" });
  });
  app.get('/signOut', auth.signOut);

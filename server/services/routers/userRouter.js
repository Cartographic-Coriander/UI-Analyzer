var express = require('express');
var userRouter = express.Router();
var auth = require('../auth');

userRouter.post('/signin', auth.authenticate, function (req, res) {
  console.log('sign in token:', req.userToken);
  res.json(req.userToken);
});

userRouter.post('/signup', auth.createUser, auth.authenticate, function (req, res) {
  res.json(req.userToken);
});

userRouter.delete('/signin', auth.signout);

module.exports = userRouter;
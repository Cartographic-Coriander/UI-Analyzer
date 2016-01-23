var User = require('../db/UserModel.js');
    Q = require('q');
    jwt = require('jwt-simple');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {

  // signin 
  signin: function (req, res, next) {
    console.log('user sign in', req.body);
    var username = req.body.username;
    var password = req.body.password;    

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password);
            .then(function (foundUser) {
              if (foundUser) {                
                var token = jwt.encode(user, 'secret');
                res.json({token: token, username: user.username});
              } else {
                return next(new Error('User was not found'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  // sign up
  signup: function (req, res, next) {
    
    var username = req.body.username;
    var password = req.body.password;    
    // check to see if user already exists 
    
    findUser({username: username})    
      .then(function (user) {          
        if (user) {
          next(new Error('User already exist!'));
        } else {          
          // make a new user if not one
          return createUser({
            username: username,
            password: password
          });
        }
      })
      .then(function (user) {                
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');                   
        res.json({token: token, username: user.username});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header if any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};
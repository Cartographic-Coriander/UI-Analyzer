// This module combines a bunch of passport stuff into one super authentication
// utility.

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var ensureAuth= require("connect-ensure-login");
var bcrypt = require("bcrypt-node");
var jwt = require('jwt-simple');
var Promise = require("bluebird");
var usersController = require("../controllers/usersController.js");

var tokenSecret = 'shhhh baby es ok';

// this creates our local strategy
passport.use(new LocalStrategy({ usernameField: 'email' },
  function (email, password, done) {
    usersController.retrieveUser({ email: email })
      // found the user
      .then(function (user) {
        return Promise.promisify(bcrypt.compare)(password, user.password)
          .then(function (match) {
            // We nest these promises because we need to access both match and user.
            if (match) {
              // valid password
              return done(null, user, { id: user.id, email: user.email });
            } else {
              // invalid password
              return done(null, false, { message: "Incorrect password." });
            }
          });
      })
      // something happened
      .catch(function (err){
        if (err.message == 'User does not exist!') {
          return(done(null, false, { message: "User not found." }));
        } else {
          return done(err);
        }
      });
  }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
  cb(null, user.email);
});

passport.deserializeUser(function (email, cb) {
  usersController.retrieveUser({ email: email })
    .then (function (user) {
      var data = {
        id: user.id,
        username: user.username,
      };
      // data is set to request.user
      cb(null, data);
    })
    .catch(function (error){
      return cb(error);
    });
});

var authenticate = function(req, res, next) {
  passport.authenticate('local',
    function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(401, { error: 'message' });
      }

      console.log('user:', user, 'info:', info)

      //user has authenticated correctly thus we create a JWT token
      req.token = jwt.encode({ username: user.id }, tokenSecret);
      next()
    })(req, res, next);
  }

var decode = function(req, res, next) {
    req.decoded = jwt.decode(req.body.token, tokenSecret);
    console.log('req token!!!!!!!!!!!!!!!!',req.decoded);
    next();
}

// inputs:
  // in data field:
  //    user:
  //      username: the useraname
  //      password: the password
  // output:
  // in data field:
  //    message: if failure, reason for failure
var createUser = function (req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password,
    company: req.body.company,
    firstname: req.body.firstname,
    surname: req.body.surname
  };

  // hashing is not done by the model, though it probably should
  Promise.promisify(bcrypt.hash)(user.password,null,null)
    .then(function (data) {
      user.password = data;
      return usersController.createUser(user);
    })
    .then(function (user) {
      // sign in the new user should be the next thing
      console.log('new user:', user);
      return next();
    })
    .catch(function (error) {
      console.log (error);
      return next();
    });
};

var signout = function(req, res){
  // call passport's log out functionality
  req.logout();
  res.redirect('/');
};

module.exports = {
  passport: passport,
  authenticate: authenticate,
  decode: decode,
  // ensuredLoggedIn is created by the guy who made Passport
  // It's not ideal for checking REST API, but it works.
  ensureLoggedIn: ensureAuth.ensureLoggedIn,
  ensureNotLoggedIn: ensureAuth.ensureNotLoggedIn,
  createUser: createUser,
  signout: signout
};
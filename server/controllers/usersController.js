var model = require('../db/model');

// input should be of the following format:
// { email: 'abc@abc.com'}
// output shall be of the following format:
// { id: 123, email: 'abc@abc.com', password: '32kj3r2kjsdnkjsd', company: 'abc' (optional), firstname: 'abc' (optional), surname: 'abc' (optional) }
var getUser = function (user) {
  return model.User.findOne({
    where: {
      email: user.email
    }
  })
  .then(function (user) {
    if (user === null) {
      throw (new Error ('User does not exist!'));
    } else {
      return user.get({ plain: true });
    }
  })
};

// input should be of the following format:
// { email: 'abc@abc.com', password: '32kj3r2kjsdnkjsd', salt: '23423asfdsafsd', company: 'abc' || NULL, firstname: 'abc' || NULL, surname: 'abc' || NULL }
// output shall be of the following format:
// { id: 123, email: 'abc@abc.com' }
var setUser = function (user) {
  params = { 
    email: user.email,
    password: user.password,
    salt: user.salt,
    company: user.company,
    firstname: user.firstname,
    surname: user.surname
  };

  return model.User.findOrCreate({
    where: params,
    defaults: params
  })
  .spread(function (user, created) {
    if (!created) {
      throw (new Error ('User already exists!'));
    } else {
      var returnObject = user.get({ plain: true });
      delete returnObject.password;
      delete returnObject.salt;
      return returnObject;
    }
  })
};

module.exports = {
  getUser: getUser,
  setUser: setUser
};

// TEST AREA

// setUser({ email: 'max@max.com', password: 'abc123', salt: 'salty', firstname: null, surname: null, company: null });
// getUser({ email: 'max@max.com' });
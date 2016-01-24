var model = require('../db/model');

// input should be of the following format:
// { email: 'abc@abc.com', password: '32kj3r2kjsdnkjsd', salt: '23423asfdsafsd', company: 'abc' || NULL, firstname: 'abc' || NULL, surname: 'abc' || NULL }
// output shall be of the following format:
// PROMISE - { id: 123, email: 'abc@abc.com', password: *null*, salt: *null*, etc }
var createUser = function (user) {
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
      throw (new Error ('Error! User already exists!'));
    } else {
      var returnObject = user.set({ password: null, salt: null });
      return returnObject;
    }
  })
};

// input should be of the following format:
// { email: 'abc@abc.com'}
// output shall be of the following format:
// PROMISE - { id: 123, email: 'abc@abc.com', password: '32kj3r2kjsdnkjsd', company: 'abc' (optional), firstname: 'abc' (optional), surname: 'abc' (optional) }
var retrieveUser = function (user) {
  return model.User.findOne({
    where: user
  })
  .then(function (result) {
    if (result === null) {
      throw (new Error ('Error! User does not exist!'));
    } else {
      return result;
    }
  })
};

// input should be of the following format:
// { email: 'abc@abc.com', etc }
// output shall be of the following format:
// { email: 'abc@abc.com', etc }
var updateUser = function (user) {
  return model.User.update(user, {
    where: {
      email: user.email
    },
    limit: 1
  })
  .spread(function (updated) {
    if (updated === 0) {
      throw (new Error ('Error! User update failed!'));
    } else {
      return user;
    }
  })
};

// input should be of the following format:
// { email: 'abc@abc.com' }
// output shall be of the following format:
// 1
var deleteUser = function (user) {
  return model.User.destroy({
    where: {
      email: user.email
    },
    limit: 1
  })
  .then(function (deleted) {
    if (deleted === 0) {
      throw (new Error ('Error! User delete failed!'));
    } else {
      return deleted;
    }
  })
};

module.exports = {
  createUser: createUser,
  retrieveUser: retrieveUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};

// TEST AREA
// model.init()
// createUser({ email: 'max@max.com', password: 'abc123', salt: 'salty', firstname: null, surname: null, company: null })
// // retrieveUser({ email: 'max@max.com' })
//   .then(function(test) {
//     console.log(test.get())
//   })
//   .then(function () {
//     return deleteUser({email: 'max@max.com'})
//       .then(function(deleted) {
//         console.log(deleted)
//       })
//   })
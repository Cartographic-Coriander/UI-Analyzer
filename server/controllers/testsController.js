var model = require('../db/model');

// var Test = sequelize.define('test', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: Sequelize.STRING, notNull: true, notEmpty: true },
//   url: { type: Sequelize.STRING, notNull: true, notEmpty: true },
//   prompt: { type: Sequelize.STRING, notNull: true, notEmpty: true }
// }, { timestamps: false });

// input should be of the following format:
// { project_id: 123, name: 'abc', url: 'abc', prompt: 'abc' }
// output shall be of the following format:
// { id: 123, project_id: 123, name: 'abc', url: 'abc', prompt: 'abc' }
var createTest = function (test) {
  return model.Test.create(test)
    .then(function (newTest) {
      return newTest;
    });
};

// input should be of the following format:
// { id: 123 ( user id ), projectId: 123 }
// output shall be of the following format:
// { id: 123, project_id: 123, name: 'abc', url: 'abc', prompt: 'abc' }
var retrieveTest = function (user) {
  return model.Test.findAll({
    where: user.project,
    include: [{
      model: model.Project,
      include: [{
        attributes: ['id', 'email'],
        model: model.User,
        where: user.user
      }]
    }]
  })
  .then(function (result) {
    if (result === null) {
      throw (new Error ('Error! Test does not exist!'));
    } else {
      return result;
    }
  });
};

// input should be of the following format:
// { id: 123, project_id: 123, name: 'abc', url: 'abc', prompt: 'abc' }
// output shall be of the following format:
// { id: 123, project_id: 123, name: 'abc', url: 'abc', prompt: 'abc' }
var updateTest = function (test) {
  var params = { id: test.id };
  return model.Test.update(test, {
    where: params
  })
  .spread(function (updated) {
    if (updated === 0) {
      throw (new Error ('Error! Test update failed!'));
    } else {
      return test;
    }
  });
};

// input should be of the following format:
// { id: 123 }
// output shall be of the following format:
// 1
var deleteTest = function (test) {
  return model.Test.destroy({
    where: test
  })
  .then(function (deleted) {
    if (deleted === 0) {
      throw (new Error ('Error! Test delete failed!'));
    } else {
      return deleted;
    }
  });
};

module.exports = {
  createTest: createTest,
  retrieveTest: retrieveTest,
  updateTest: updateTest,
  deleteTest: deleteTest
};

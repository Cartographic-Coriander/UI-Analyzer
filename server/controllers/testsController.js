var model = require('../db/model');

// input should be of the following format:
// { userId: 123, projectId: 123, name: 'abc', url: 'abc', prompt: 'abc' }
// output shall be of the following format:
// { id: 123, projectId: 123, name: 'abc', url: 'abc', prompt: 'abc' }
var createTest = function (test) {
  return model.Project.findOne({
    where: { id: test.projectId },
    include: [{
      attributes: ['id', 'email'],
      model: model.User,
      where: { id: test.userId }
    }]
  })
  .then(function (result) {
    if (result.users[0].projectUser.get('role') === 'owner') {
      var params = {
        projectId: test.projectId,
        name: test.name,
        url: test.url,
        prompt: test.prompt
      };

      return model.Test.create(params)
        .then(function (newTest) {
          return newTest;
        });
    } else {
      throw (new Error ('Error! Insufficient permissions to create this entry!'));
    }
  });
};

// input should be of the following format:
// { userId: 123 ( user id ), projectId: 123 }
// output shall be of the following format:
// { id: 123, projectId: 123, name: 'abc', url: 'abc', prompt: 'abc' }
var retrieveTest = function (test) {
  return model.Test.findAll({
    where: { projectId: test.projectId },
    include: [{
      model: model.Project,
      include: [{
        attributes: ['id', 'email'],
        model: model.User,
        where: { id: test.userId }
      }]
    }]
  })
  .then(function (result) {
    if (result.length === 0) {
      var error = new Error ('Error! Test does not exist!');
      error.name = 'emptyResults';
      throw (error);
    } else {
      return result;
    }
  });
};

// input should be of the following format:
// { userId: 123, testId: 123, projectId: 123, update: { name: 'abc', url: 'abc', prompt: 'abc' } }
// output shall be of the following format:
// { userId: 123, testId: 123, projectId: 123, update: { name: 'abc', url: 'abc', prompt: 'abc' } }
var updateTest = function (test) {
  return model.Test.findOne({
    where: { id: test.testId, projectId: test.projectId },
    include: [{
      model: model.Project,
      include: [{
        attributes: ['id', 'email'],
        model: model.User,
        where: { id: test.userId }
      }]
    }]
  })
  .then(function (result) {
    if (result.project.users[0].projectUser.get('role') === 'owner') {
      var params = { id: test.testId };

      return model.Test.update(test.update, {
        where: params
      })
      .spread(function (updated) {
        if (updated === 0) {
          throw (new Error ('Error! Test update failed!'));
        } else {
          return test;
        }
      });
    } else {
      throw (new Error ('Error! Insufficient permissions to modify this entry!'));
    }
  });
};

// input should be of the following format:
// { userId: 123, testId: 123, projectId: 123 }
// output shall be of the following format:
// 1
var deleteTest = function (test) {
  return model.Test.findOne({
    where: { id: test.testId, projectId: test.projectId },
    include: [{
      model: model.Project,
      include: [{
        attributes: ['id', 'email'],
        model: model.User,
        where: { id: test.userId }
      }]
    }]
  })
  .then(function (result) {
    console.log('')
    if (result.project.users[0].projectUser.get('role') === 'owner') {
      var params = { id: test.testId };

      return model.Test.destroy({
        where: params
      })
      .then(function (deleted) {
        if (deleted === 0) {
          throw (new Error ('Error! Test delete failed!'));
        } else {
          return deleted;
        }
      });
    } else {
      console.log('permissions error')
      var error = new Error ('Error! Insufficient permissions to modify this entry!');
      error.name = 'unauthorized';
      throw (error);
    }
  });
};

module.exports = {
  createTest: createTest,
  retrieveTest: retrieveTest,
  updateTest: updateTest,
  deleteTest: deleteTest
};

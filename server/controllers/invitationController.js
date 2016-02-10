var model = require('../db/model');

// var Test = sequelize.define('test', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: Sequelize.STRING, notNull: true, notEmpty: true },
//   url: { type: Sequelize.STRING, notNull: true, notEmpty: true },
//   prompt: { type: Sequelize.STRING, notNull: true, notEmpty: true }
// }, { timestamps: false });

// input should be of the following format:
// { userId: 123, projectId: 123, name: 'abc', url: 'abc', prompt: 'abc' }
// output shall be of the following format:
// { id: 123, projectId: 123, name: 'abc', url: 'abc', prompt: 'abc' }
var createInvitation = function (invitation) {
  return model.Project.findOne({
    where: { id: invitation.projectId },
    include: [{
      attributes: ['id', 'email'],
      model: model.User,
      where: { id: invitation.userId }
    }]
  })
  .then(function (result) {
    if (result.users[0].projectUser.get('role') === 'owner') {
      var params = {
        projectId: invitation.projectId,
        token: invitation.token,
        email: invitation.email
      };

      return model.Invitation.create(params)
        .then(function (newInvitation) {
          return newInvitation;
        });
    } else {
      throw (new Error ('Error! Insufficient permissions to create this entry!'));
    }
  });
};

var createTester = function (user) {

}

// input should be of the following format:
// { token: 'abcd', projectId: 123 }
// output shall be of the following format:
// { id: 123, projectId: 123, name: 'abc', url: 'abc', prompt: 'abc' }
var retrieveInvitation = function (invitation) {
  return model.Invitation.findOne({
    where: {
      token: invitation.token
    }
  })
  .then(function (result) {
    if (result === null) {
      throw (new Error ('Error! Invitation does not exist!'));
    } else {
      return result;
    }
  });
};

// input should be of the following format:
// { userId: 123, projectId: 123 }
// output shall be of the following format:
// [{ id: 123,  email: 'abc', token: 'abc', projectId: 123 }, ...]
var retrieveAllInvitations = function (invitation) {
  return model.Invitation.findAll({
    where: { projectId: invitation.projectId },
    include: [{
      model: model.Project,
      include: [{
        attributes: ['id', 'email'],
        model: model.User,
        where: { id: invitation.userId }
      }]
    }]
  })
  .then(function (result) {
    if (result.length === 0) {
      throw (new Error ('Error! Invitations do not exist!'));
    } else {
      return result;
    }
  });
}

// input should be of the following format:
// { userId: 123, testId: 123, projectId: 123, update: { name: 'abc', url: 'abc', prompt: 'abc' } }
// output shall be of the following format:
// { userId: 123, testId: 123, projectId: 123, update: { name: 'abc', url: 'abc', prompt: 'abc' } }
// var updateInvitation = function (test) {
//   return model.Invitation.findOne({
//     where: { id: test.testId, projectId: test.projectId },
//     include: [{
//       model: model.Project,
//       include: [{
//         attributes: ['id', 'email'],
//         model: model.User,
//         where: { id: test.userId }
//       }]
//     }]
//   })
//   .then(function (result) {
//     if (result.project.users[0].projectUser.get('role') === 'owner') {
//       var params = { id: test.testId };

//       return model.Test.update(test.update, {
//         where: params
//       })
//       .spread(function (updated) {
//         if (updated === 0) {
//           throw (new Error ('Error! Test update failed!'));
//         } else {
//           return test;
//         }
//       });
//     } else {
//       throw (new Error ('Error! Insufficient permissions to modify this entry!'));
//     }
//   });
// };

// input should be of the following format:
// { userId: 123, testId: 123, projectId: 123 }
// output shall be of the following format:
// 1
var deleteInvitation = function (invitation) {
  return model.Invitation.findOne({
    where: { id: invitation.invitationId, projectId: invitation.projectId },
    include: [{
      model: model.Project,
      include: [{
        attributes: ['id', 'email'],
        model: model.User,
        where: { id: invitation.userId }
      }]
    }]
  })
  .then(function (result) {
    if (result.project.users[0].projectUser.get('role') === 'owner') {
      var params = { id: invitation.invitationId };

      return model.Invitation.destroy({
        where: params
      })
      .then(function (deleted) {
        if (deleted === 0) {
          throw (new Error ('Error! Invitation delete failed!'));
        } else {
          return deleted;
        }
      });
    } else {
      throw (new Error ('Error! Insufficient permissions to modify this entry!'));
    }
  });
};

module.exports = {
  createInvitation: createInvitation,
  retrieveInvitation: retrieveInvitation,
  retrieveAllInvitations: retrieveAllInvitations,
  // updateInvitation: updateInvitation,
  createTester: createTester,
  deleteInvitation: deleteInvitation
};

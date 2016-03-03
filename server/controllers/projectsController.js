var model = require('../db/model');

// input should be of the following format:
// { userId: 123, name: 'abc', description: 'abc' }
// output shall be of the following format:
// { id: 123, name: 'abc', description: 'abc' }
var createProject = function (project) {
  var params = {
    name: project.name,
    description: project.description
  };

  return model.sequelize.transaction(function (t) {
    return model.Project.create(params, { transaction: t })
      .then(function (newProject) {
        var params = { userId: project.userId, projectId: newProject.get('id'), role: 'owner' };
        console.log('new project: ', params)

        return model.ProjectUser.create(params, { transaction: t })
          .then(function (projectUser) {
            if (projectUser === null) {
              throw (new Error ('Error! Unable to create project_user join!'));
            } else {
              return newProject;
            }
          });
      });
  });
};

// input should be of the following format:
// { userId: 123 }
// output shall be of the following format:
// { id: 123, name: 'abc', description: 'abc' }
var retrieveProject = function (project) {
  return model.Project.findAll({
    include: [{
      model: model.User,
      where: { id: project.userId },
      attributes: [ 'id', 'email' ]
    }]
  })
  .then(function (result) {
    if (result.length === 0) {
      var error = new Error ('Error! Projects do not exist!');
      error.name = 'emptyResults';
      throw (error);
    } else {
      return result;
    }
  });
};

// input should be of the following format:
// { id: 123, name: 'abc', description: 'abc' }
// output shall be of the following format:
// { id: 123, name: 'abc', description: 'abc' }
var updateProject = function (project) {
  var params = { id: project.projectId };

  return model.Project.findOne({
    where: params,
    include: [{
      model: model.User,
      where: { id: project.userId },
      attributes: [ 'id', 'email' ]
    }]
  })
  .then(function (result) {
    if (result.users[0].projectUser.get('role') === 'owner') {
      return model.Project.update(project.update, {
        where: params
      })
      .spread(function (updated) {
        if (updated === 0) {
          throw (new Error ('Error! Project update failed!'));
        } else {
          return project;
        }
      });
    } else {
      throw (new Error ('Error! Insufficient permissions to modify this entry!'));
    }
  });
};

// input should be of the following format:
// { id: 123 }
// output shall be of the following format:
// 1
var deleteProject = function (project) {
  var params = { id: project.projectId };

  return model.Project.findOne({
    where: params,
    include: [{
      model: model.User,
      where: { id: project.userId },
      attributes: [ 'id', 'email' ]
    }]
  })
  .then(function (result) {
    if (result.users[0].projectUser.get('role') === 'owner') {
      var params = { id: project.projectId };

      return model.Project.destroy({
        where: params
      })
      .then(function (deleted) {
        if (deleted === 0) {
          throw (new Error ('Error! Project delete failed!'));
        } else {
          return deleted;
        }
      });
    } else {
      var error = new Error ('Error! Insufficient permissions to modify this entry!');
      error.name = 'unauthorized';
      throw (error);
    }
  });

};

module.exports = {
  createProject: createProject,
  retrieveProject: retrieveProject,
  updateProject: updateProject,
  deleteProject: deleteProject
};

// TEST AREA
// model.init();
// createProject({ user_id: 1, name: 'abc', description: 'abc'})
//   .then(function (project) {
//     console.log(project.get());
//   })

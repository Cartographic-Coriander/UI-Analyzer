var model = require('../db/model');

// input should be of the following format:
// { user_id: 123, name: 'abc', description: 'abc' }
// output shall be of the following format:
// PROMISE - { id: 123, name: 'abc', description: 'abc' }
var createProject = function (project) {
  var params = { name: project.name, description: project.description };
  return model.Project.findOrCreate({
    where: params,
    defaults: params
  })
  .spread(function (newProject, created) {
    if (!created) {
      throw (new Error ('Project already exists!'));
    } else {
      var params = { user_id: project.user_id, project_id: newProject.get('id'), role: 'Owner' };
      console.log('!!!params', params);
      return model.ProjectUser.findOrCreate({
        where: params,
        defaults: params
      })
      .spread(function (projectUser, created) {
        if (!created) {
          throw (new Error ('Error! Unable to create project_user join!'));
        } else {
          return projectUser;
        }
      })
    }
  })
};

// input should be of the following format:
// { name: 'abc' } 
// output shall be of the following format:
// PROMISE - { id: 123, name: 'abc', description: 'abc' }
var retrieveProject = function (project) {
  return model.Project.findOne({
    where: project
  })
  .then(function (project) {
    if (project === null) {
      throw (new Error ('Error! Project does not exist!'));
    } else {
      return project;
    }
  })
};

// input should be of the following format:
// { name: 'abc', description: 'abc' }
// output shall be of the following format:
// PROMISE - { name: 'abc', description: 'abc'}
var updateProject = function (project) {
  return model.Project.update(project, {
    where: project.name,
    limit: 1
  })
  .spread(function (updated) {
    if (updated === 0) {
      throw (new Error ('Error! User update failed!'));
    } else {
      return project;
    }
  })
};

// input should be of the following format:
// { name: 'abc' }
// output shall be of the following format:
// PROMISE - { name: 'abc' }
var deleteProject = function (project) {
  return model.Project.destroy({
    where: project,
    limit: 1
  })
  .then(function (deleted) {
    if (deleted === 0) {
      throw (new Error ('Error! Project delete failed!'));
    } else {
      return deleted;
    }
  })
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
var model = require('../db/model');

// var Project = sequelize.define('project', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: Sequelize.STRING, unique: true, notNull: true, notEmpty: true },
//   description: { type: Sequelize.STRING }
// }, { timestamps: false });

// input should be of the following format:
// { user_id: 123, name: 'abc', description: 'abc' }
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
      var params = { user_id: project.user_id, project_id: newProject.get('id'), role: 'Owner' };

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
// { user_id: 123 }
// output shall be of the following format:
// { id: 123, name: 'abc', description: 'abc' }
var retrieveProject = function (project) {
  return model.Project.findAll({
    include: [{
      model: ProjectUser,
      where: [ project ]
    }]
  })
  .then(function (result) {
    if (result === null) {
      throw (new Error ('Error! Projects do not exist!'));
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
  var params = { id: project.id };

  return model.Project.update(project, {
    where: params
  })
  .spread(function (updated) {
    if (updated === 0) {
      throw (new Error ('Error! Project update failed!'));
    } else {
      return project;
    }
  });
};

// input should be of the following format:
// { id: 123 }
// output shall be of the following format:
// 1
var deleteProject = function (project) {
  return model.Project.destroy({
    where: project
  })
  .then(function (deleted) {
    if (deleted === 0) {
      throw (new Error ('Error! Project delete failed!'));
    } else {
      return deleted;
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

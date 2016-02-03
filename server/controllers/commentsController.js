var model = require('../db/model');

// var Comment = sequelize.define('comment', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   commentType: { type: Sequelize.STRING, notNull: true, notEmpty: true },
//   commentText: { type: Sequelize.STRING },
//   x: { type: Sequelize.INTEGER },
//   y: { type: Sequelize.INTEGER }
// }, { timestamps: false });

// input should be of the following format:
// { userId: 123, imageId: 123, commentType: 'green', commentText: 'abc', x: 123, y: 123 }
// output shall be of the following format:
// { id: 123, project_id: 123, commentType: 'green', commentText: 'abc', x: 123, y: 123 }
var createComment = function (comment) {
  return model.Comment.create(comment)
    .then(function (newComment) {
      return newComment;
    });
};

// input should be of the following format:
// { user: { id: 123 (user id) }, image: { imageId: 123 }, imageId: { id: 123 (image id) } }
// output shall be of the following format:
// { id: 123, user_id: 123, commentType: 'green', commentText: 'abc', x: 123, y: 123 }
var retrieveComment = function (comment) {
  return model.Comment.findAll({
    where: { imageId: comment.imageId },
    include: [{
      model: model.User,
      where: { id: comment.userId },
      attributes: [ 'id', 'email' ],
      include: [{
        model: model.Project,
        include: [{
          model: model.Test,
          include: [{
            model: model.Image,
            where: { id: comment.imageId }
          }]
        }]
      }]
    }]
  })
  .then(function (result) {
    if (result === null) {
      throw (new Error ('Error! Comment does not exist!'));
    } else {
      return result;
    }
  });
};

// input should be of the following format:
// { id: 123, project_id: 123, commentType: 'abc', commentType: 'textBox', x: 123, y: 123 }
// output shall be of the following format:
// { id: 123, project_id: 123, commentType: 'abc', commentType: 'textBox', x: 123, y: 123 }
var updateComment = function (comment) {
  var params = { id: comment.commentId };

  return model.Image.findOne({
    where: { id: comment.imageId },
    include: [{
      model: model.Comment,
      where: params,
      include: [{
        model: model.User,
        where: { id: comment.userId },
        attributes: [ 'id', 'email' ],
        include: [{
          model: model.Project,
          include: [{
            model: model.Test,
            include: [{
              model: model.Image,
              where: { id: comment.imageId }
            }]
          }]
        }]
      }]
    }]
  })
  .then(function (result) {
    if (result.comments[0].user.projects[0].projectUser.get('role') === 'owner') {
      return model.Comment.update(comment.update, {
        where: params
      })
      .spread(function (updated) {
        if (updated === 0) {
          throw (new Error ('Error! Comment update failed!'));
        } else {
          return updated;
        }
      });
    } else {
      throw (new Error ('Error! Insufficient permissions to modify this entry!'));
    }
  })
};

// input should be of the following format:
// { id: 123 }
// output shall be of the following format:
// 1
var deleteComment = function (comment) {
  var params = { id: comment.commentId };

  return model.Image.findOne({
    where: { id: comment.imageId },
    include: [{
      model: model.Comment,
      where: params,
      include: [{
        model: model.User,
        where: { id: comment.userId },
        attributes: [ 'id', 'email' ],
        include: [{
          model: model.Project,
          include: [{
            model: model.Test,
            include: [{
              model: model.Image,
              where: { id: comment.imageId }
            }]
          }]
        }]
      }]
    }]
  })
  .then(function (result) {
    if (result.comments[0].user.projects[0].projectUser.get('role') === 'owner') {
      return model.Comment.destroy({
        where: params
      })
      .then(function (deleted) {
        if (deleted === 0) {
          throw (new Error ('Error! Comment delete failed!'));
        } else {
          return deleted;
        }
      });
    } else {
      throw (new Error ('Error! Insufficient permissions to modify this entry!'));
    }
  })

};

module.exports = {
  createComment: createComment,
  retrieveComment: retrieveComment,
  updateComment: updateComment,
  deleteComment: deleteComment
};

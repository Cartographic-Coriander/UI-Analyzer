var model = require('../db/model');

// var Comment = sequelize.define('comment', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   commentType: { type: Sequelize.STRING, notNull: true, notEmpty: true },
//   commentText: { type: Sequelize.STRING },
//   x: { type: Sequelize.INTEGER },
//   y: { type: Sequelize.INTEGER }
// }, { timestamps: false });

// input should be of the following format:
// { project_id: 123, commentType: 'green', commentText: 'abc', x: 123, y: 123 }
// output shall be of the following format:
// { id: 123, project_id: 123, commentType: 'green', commentText: 'abc', x: 123, y: 123 }
var createComment = function (comment) {
  return model.Comment.create(comment)
    .then(function (newComment) {
      return newComment;
    });
};

// input should be of the following format:
// { userId: 123, testId: 123 }
// output shall be of the following format:
// { id: 123, user_id: 123, commentType: 'green', commentText: 'abc', x: 123, y: 123 }
var retrieveComment = function (comment) {
  console.log('input params', comment)
  return model.Comment.findAll({
    include: [{
      model: model.User,
      where: { id: comment.userId },
      attributes: [ 'id', 'email' ],
      include: [{
        model: model.Project,
        include: [{
          model: model.Test
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
  var params = { id: comment.id };

  return model.Comment.update(comment, {
    where: params
  })
  .spread(function (updated) {
    if (updated === 0) {
      throw (new Error ('Error! Comment update failed!'));
    } else {
      return comment;
    }
  });
};

// input should be of the following format:
// { id: 123 }
// output shall be of the following format:
// 1
var deleteComment = function (comment) {
  return model.Comment.destroy({
    where: comment
  })
  .then(function (deleted) {
    if (deleted === 0) {
      throw (new Error ('Error! Comment delete failed!'));
    } else {
      return deleted;
    }
  });
};

module.exports = {
  createComment: createComment,
  retrieveComment: retrieveComment,
  updateComment: updateComment,
  deleteComment: deleteComment
};

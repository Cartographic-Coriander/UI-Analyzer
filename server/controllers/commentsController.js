var model = require('../db/model');

// var Comment = sequelize.define('comment', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   commentType: { type: Sequelize.STRING, notNull: true, notEmpty: true },
//   commentText: { type: Sequelize.STRING },
//   x: { type: Sequelize.INTEGER },
//   y: { type: Sequelize.INTEGER },
// }, { timestamps: false });

// input should be of the following format:
// { commentType: 'green', commentText: 'abc', x: 123, y: 123 }
// output shall be of the following format:
// { name: 'abc' }
var createComment = function (comment) {
  return model.Comment.create(comment)
    .then(function (newComment) {

    })
};

// input should be of the following format:
// { name: 'abc' }
// output shall be of the following format:
// { name: 'abc' }
var retrieveComment = function (comment) {
  return model.Comment.
};

// input should be of the following format:
// { name: 'abc' }
// output shall be of the following format:
// { name: 'abc' }
var updateComment = function (comment) {
  return model.Comment.
};

// input should be of the following format:
// { name: 'abc' }
// output shall be of the following format:
// { name: 'abc' }
var deleteComment = function (comment) {
  return model.Comment.
};

module.exports = {
  createComment: createComment,
  retrieveComment: retrieveComment,
  updateComment: updateComment,
  deleteComment: deleteComment
};
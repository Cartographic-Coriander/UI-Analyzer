var model = require('../db/model');

// input should be of the following format:
// { commentType: 'green', commentText: 'abc', x: 123, y: 123 }
// output shall be of the following format:
// { id: 123, commentType: 'green', commentText: 'abc', x: 123, y: 123 }
var createComment = function (comment) {
  return model.Comment.create(comment)
    .then(function (newComment) {
      return newComment;
    })
};

// input should be of the following format:
// { id: 123 }
// output shall be of the following format:
// { id: 123, commentType: 'green', commentText: 'abc', x: 123, y: 123 }
var retrieveComment = function (comment) {
  return model.Comment.findOne({
    where: comment
  })
  .then(function (result) {
    if (result === null) {
      throw (new Error ('Error! Comment does not exist!'));
    } else {
      return result;
    }
  })
};

// input should be of the following format:
// { id: 123, commentType: 'abc', commentType: 'textBox', x: 123, y: 123 }
// output shall be of the following format:
// { id: 123, commentType: 'abc', commentType: 'textBox', x: 123, y: 123 }
var updateComment = function (comment) {
  return model.Comment.update(comment, {
    where: {
      id: comment.id
    },
    limit: 1
  })
  .spread(function (updated) {
    if (updated === 0) {
      throw (new Error ('Error! Comment update failed!'));
    } else {
      return comment;
    }
  })
};

// input should be of the following format:
// { id: 123 }
// output shall be of the following format:
// 1
var deleteComment = function (comment) {
  return model.Comment.destroy({
    where: comment,
    limit: 1
  })
  .then(function (deleted) {
    if (deleted === 0) {
      throw (new Error ('Error! Comment delete failed!'));
    } else {
      return deleted;
    }
  })
};

module.exports = {
  createComment: createComment,
  retrieveComment: retrieveComment,
  updateComment: updateComment,
  deleteComment: deleteComment
};
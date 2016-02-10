var model = require('../db/model');

// var Image = sequelize.define('image', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   image: { type: Sequelize.STRING, unique: true, notNull: true, notEmpty: true },
//   url: { type: Sequelize.STRING, notNull: true, notEmpty: true }
// }, { timestamps: false });

// input should be of the following format:
// { userId: 123, testId: 123, image: (stringified png file), url: 'abc' }
// output shall be of the following format:
// {id: 123, image: (stringified png file), url: 'abc' }
var createImage = function (image) {
  return model.Image.findOrCreate({
    where: image,
    defaults: image
  })
  .spread(function (newImage, created) {
    return newImage;
  });
};

// input should be of the following format:
// { testId: 123, userId: 123 }
// output shall be of the following format:
// [{ id: 123, image: (stringified png file), url: 'abc' }, ..., { id: 123, image: (stringified png file), url: 'abc' }]
var retrieveImage = function (image) {
  return model.Image.findAll({
    where: { testId: image.testId },
    include: [{
      model: model.Test,
      include: [{
        model: model.Project,
        include: [{
          model: model.User,
          where: { id: image.userId },
          attributes: [ 'id', 'email' ]
        }]
      }]
    }]
  })
  .then(function (result) {
    if (result.length === 0) {
      throw (new Error ('Error! Image does not exist!'));
    } else {
      return result;
    }
  });
};

// input should be of the following format:
// { id: 123, test_id: 123, image: (stringified png file), url: 'abc' }
// output shall be of the following format:
// { id: 123, test_id: 123, image: (stringified png file), url: 'abc' }
var updateImage = function (image) {
  return model.Image.findOne({
    where: { id: image.imageId, testId: image.testId },
    include: [{
      model: model.Test,
      include: [{
        model: model.Project,
        include: [{
          model: model.User,
          where: { id: image.userId },
          attributes: [ 'id', 'email' ]
        }]
      }]
    }]
  })
  .then(function (result) {
    if (result.test.project.users[0].projectUser.get('role') === 'owner') {
      var params = { id: image.imageId };

      return model.Image.update(image.update, {
        where: params
      })
      .spread(function (updated) {
        if (updated === 0) {
          throw (new Error ('Error! Image update failed!'));
        } else {
          return image;
        }
      });
    } else {
      throw (new Error ('Error! Insufficient permissions to modify this entry!'));
    }
  });
};

// input should be of the following format:
// { userId: 123, testId: 123, imageId: 123 }
// output shall be of the following format:
// 1
var deleteImage = function (image) {
  return model.Image.findOne({
    where: { id: image.imageId, testId: image.testId },
    include: [{
      model: model.Test,
      include: [{
        model: model.Project,
        include: [{
          model: model.User,
          where: { id: image.userId },
          attributes: [ 'id', 'email' ]
        }]
      }]
    }]
  })
  .then(function (result) {
    if (result.test.project.users[0].projectUser.get('role') === 'owner') {
      var params = { id: image.imageId };

      return model.Image.destroy({
        where: params
      })
      .then(function (deleted) {
        if (deleted === 0) {
          throw (new Error ('Error! Image delete failed!'));
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
  createImage: createImage,
  retrieveImage: retrieveImage,
  updateImage: updateImage,
  deleteImage: deleteImage
};

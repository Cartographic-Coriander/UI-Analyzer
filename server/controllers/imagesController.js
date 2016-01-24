var model = require('../db/model');

// var Image = sequelize.define('image', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   image: { type: Sequelize.STRING, unique: true, notNull: true, notEmpty: true },
//   url: { type: Sequelize.STRING, notNull: true, notEmpty: true }
// }, { timestamps: false });

// input should be of the following format:
// { test_id: 123, image: (stringified png file), url: 'abc' }
// output shall be of the following format:
// {id: 123, image: (stringified png file), url: 'abc' }
var createImage = function (image) {
  return model.Image.create(image)
    .then(function (newImage) {
      return newImage;
    });
};

// input should be of the following format:
// { test_id: 123 }
// output shall be of the following format:
// [{ id: 123, image: (stringified png file), url: 'abc' }, ..., { id: 123, image: (stringified png file), url: 'abc' }]
var retrieveImage = function (image) {
  return model.Image.findAll({
    where: image
  })
  .then(function (result) {
    if (result === null) {
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
  var params = { id: image.id };
  return model.Image.update(image, {
    where: params
  })
  .spread(function (updated) {
    if (updated === 0) {
      throw (new Error ('Error! Image update failed!'));
    } else {
      return image;
    }
  });
};

// input should be of the following format:
// { id: 123 }
// output shall be of the following format:
// 1
var deleteImage = function (image) {
  return model.Image.destroy({
    where: image
  })
  .then(function (deleted) {
    if (deleted === 0) {
      throw (new Error ('Error! Image delete failed!'));
    } else {
      return deleted;
    }
  });
};

module.exports = {
  createImage: createImage,
  retrieveImage: retrieveImage,
  updateImage: updateImage,
  deleteImage: deleteImage
};

var model = require('../db/model');

// var MouseTracking = sequelize.define('mousetracking', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   movement: { type: Sequelize.STRING, notNull: true, notEmpty: true },
//   clicks: { type: Sequelize.STRING, notNull: true },
//   urlchange: { type: Sequelize.STRING, notNull: true }
// }, { timestamps: false });

// input should be of the following format:
// { movement: 'abc', clicks: 'abc', urlchange: 'abc', test_id: 123 }
// output shall be of the following format:
// { id: 123, movement: 'abc', clicks: 'abc', urlchange: 'abc' }
var createMouseTracking = function (mouseTracking) {
  var params = {
    movement: mouseTracking.movement,
    clicks: mouseTracking.clicks,
    urlchange: mouseTracking.urlchange
  };

  return model.sequelize.transaction(function (t) {
    return model.MouseTracking.create(params, { transaction: t })
      .then(function (newMouseTracking) {
        var params = { test_id: mouseTracking.test_id, mousetracking_id: newMouseTracking.get('id') };

        return model.MouseTrackingTest.create(params, { transaction: t })
          .then(function (mouseTrackingTest) {
            if (mouseTrackingTest === null) {
              throw (new Error ('Error! Unable to create mousetracking_test join!'));
            } else {
              return newMouseTracking;
            }
          });
      });
  });
};

// input should be of the following format:
// { id: 123 }
// output shall be of the following format:
// { id: 123, movement: 'abc', clicks: 'abc', urlchange: 'abc' }
var retrieveMouseTracking = function (mouseTracking) {
  return model.MouseTracking.findAll({
    include: [{
      model: Test,
      where: mousetracking
    }]
  })
  .then(function (result) {
    if (result === null) {
      throw (new Error ('Error! Mouse tracking does not exist!'));
    } else {
      return result;
    }
  });
};

// input should be of the following format:
// { id: 123, movement: 'abc', clicks: 'abc', urlchange: 'abc' }
// output shall be of the following format:
// { id: 123, movement: 'abc', clicks: 'abc', urlchange: 'abc' }
var updateMouseTracking = function (mouseTracking) {
  var params = { id: mouseTracking.id };

  return model.MouseTracking.update(mouseTracking, {
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
var deleteMouseTracking = function (mouseTracking) {
  return model.MouseTracking.destroy({
    where: mouseTracking
  })
  .then(function (deleted) {
    if (deleted === 0) {
      throw (new Error ('Error! Mouse tracking delete failed!'));
    } else {
      return deleted;
    }
  });
};

module.exports = {
  createMouseTracking: createMouseTracking,
  retrieveMouseTracking: retrieveMouseTracking,
  updateMouseTracking: updateMouseTracking,
  deleteMouseTracking: deleteMouseTracking
};

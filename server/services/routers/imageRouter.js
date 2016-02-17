var express = require('express');
var router = express.Router();
var imagesController = require('../../controllers/imagesController');
var Promise = require('bluebird');
var fs = require('fs');

module.exports = function () {
  router.get(function (req, res) {
    var params = {
      userId: req.decoded.iss,
      testId: req.query.testId
    };

    imagesController.retrieveImage(params)
      .then(function (results) {

        return Promise.reduce(results, function (previous, current) {
          var image = current.get('image').split('/');
          var buffer = fs.readFileSync(current.get('image')).toString('base64');
          var params = {
            id: current.get('id'),
            testId: current.get('testId'),
            url: current.get('url'),
            image: buffer
          };

          previous.push(params);
          return previous;
        }, []);
      })
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        if (error.name === 'emptyResults') {
          res.status(550).end('Image GET Error! Results Empty');
        }
        console.log('/api/image GET Error!', error);
        res.status(500).end('Image GET Error!');
      });
  });

  router.post(function (req, res) {
    var params = {
      userId: req.decoded.iss,
      testId: req.body.testId,
      image: req.body.image,
      url: req.body.url
    };

    imagesController.createImage(params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        console.log('/api/image POST Error!', error);
        res.status(500).end('Image POST Error!');
      });
  });

  router.put(function (req, res) {
    var params = {
      userId: req.decoded.iss,
      imageId: req.body.imageId,
      testId: req.body.testId,
      update: {
        image: req.body.image,
        url: req.body.url
      }
    };

    imagesController.updateImage(params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        console.log('/api/image PUT Error!', error);
        res.status(500).end('Image PUT Error!');
      });
  });

  router.delete(function (req, res) {
    var params = {
      userId: req.decoded.iss,
      imageId: req.query.imageId,
      testId: req.query.testId,
    };

    imagesController.deleteImage(params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        console.log('/api/image DELETE Error!', error);
        res.status(500).end('Image DELETE Error!');
      });
  });
};
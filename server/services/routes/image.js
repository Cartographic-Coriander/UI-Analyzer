var imagesController = require('../../controllers/imagesController');
var auth = require('../auth');
var Promise = require('bluebird');
var fs = require('fs');

module.exports = function (app, express) {
  app.route('/api/image')
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */

      var params = {
        userId: req.decoded.iss,
        testId: req.query.testId
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   testId: req.query.testId
      // };

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
          // app.use('/image', express.static(__dirname + '/../data/screenshots/' + req.testId));
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image GET Error!', error);
          res.status(500).end('Image GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
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
    })
    .put(auth.decode, function (req, res) {
    // .put(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        imageId: req.body.imageId,
        testId: req.body.testId,
        update: {
          image: req.body.image,
          url: req.body.url
        }
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   testId: req.query.testId,
      //   update: {
      //     image: req.query.image,
      //     url: req.query.url
      //   }
      // };

      imagesController.updateImage(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image PUT Error!', error);
          res.status(500).end('Image PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
    // .delete(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        imageId: req.body.imageId,
        testId: req.body.testId,
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   testId: req.query.testId,
      // };

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
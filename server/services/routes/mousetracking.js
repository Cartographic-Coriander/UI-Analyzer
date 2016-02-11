var mousetrackingController = require('../../controllers/mousetrackingController');
var auth = require('../auth');

module.exports = function (app, express) {
  app.route('/api/mousetracking')
    // .get(auth.decode, function (req, res) {
    .get(function (req, res) { /* for testing purposes */
      // var params = {
      //   userId: req.decoded.iss,
      //   imageId: req.query.imageId
      // };
      var params = { /* for testing purposes */
        userId: req.query.userId,
        imageId: req.query.imageId
      };

      mousetrackingController.retrieveMouseTracking(params)
        .then(function (results) {
          return results.reduce(function (previous, current) {
            var params = {
              id: current.get('id'),
              movement: current.get('movement'),
              clicks: current.get('clicks'),
              urlchange: current.get('urlchange'),
              imageId: current.get('imageId'),
              userId: current.get('userId')
            };

            previous.push(params);
            return previous;
          }, []);
        })
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking GET Error!', error);
          res.status(500).end('Mousetracking GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
      var params = {
        userId: req.decoded.iss,
        imageId: req.body.imageId,
        data: req.body.data
      };

      mousetrackingController.retrieveMouseTracking(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking POST Error!', error);
          res.status(500).end('Mousetracking POST Error!');
        });
    })
    .put(auth.decode, function (req, res) {
    // .put(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        imageId: req.body.imageId,
        mouseTrackingId: req.body.mouseTrackingId,
        update: {
          movement: req.body.movement,
          clicks: req.body.clicks,
          urlchange: req.body.urlchange
        }
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   mouseTrackingId: req.query.mouseTrackingId,
      //   update: {
      //     data: req.query.data
      //   }
      // };

      mousetrackingController.updateMouseTracking(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking PUT Error!', error);
          res.status(500).end('Mousetracking PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
    // .delete(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        imageId: req.body.imageId,
        mouseTrackingId: req.body.mouseTrackingId
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   mouseTrackingId: req.query.mouseTrackingId
      // };

      mousetrackingController.deleteMouseTracking(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking DELETE Error!', error);
          res.status(500).end('Mousetracking DELETE Error!');
        });
    });
};
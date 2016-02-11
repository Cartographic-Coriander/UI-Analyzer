var commentsController = require('../../controllers/commentsController');
var auth = require('../auth');

module.exports = function (app, express) {
  app.route('/api/comment')
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        imageId: req.query.imageId
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId
      // };

      commentsController.retrieveComment(params)
        .then(function (results) {
          return results.reduce(function (previous, current) {
            var params = {
              id: current.get('id'),
              userId: current.get('userId'),
              imageId: current.get('imageId'),
              commentType: current.get('commentType'),
              commentText: current.get('commentText'),
              x: current.get('x'),
              y: current.get('y')
            };

            previous.push(params);
            return previous;
          }, []);
        })
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment GET Error!', error);
          res.status(500).end('Test GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
      var params = {
        userId: req.decoded.iss,
        imageId: req.body.imageId,
        commentType: req.body.commentType,
        commentText: req.body.commentText,
        x: req.body.x,
        y: req.body.y
      };

      commentsController.createComment(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment POST Error!', error);
          res.status(500).end('Test POST Error!');
        });
    })
    .put(auth.decode, function (req, res) {
    // .put(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        imageId: req.body.imageId,
        commentId: req.body.id,
        update: {
          commentType: req.body.commentType,
          commentText: req.body.commentText,
          x: req.body.x,
          y: req.body.y
        }
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   commentId: req.query.commentId,
      //   update: {
      //     commentType: req.query.commentType,
      //     commentText: req.query.commentText,
      //     x: req.query.x,
      //     y: req.query.y
      //   }
      // };

      commentsController.updateComment(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment PUT Error!', error);
          res.status(500).end('Test PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
    // .delete(function (req, res) {
      var params = {
        userId: req.decoded.iss,
        imageId: req.body.imageId,
        commentId: req.body.commentId
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   commentId: req.query.commentId
      // };

      commentsController.deleteComment(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment DELETE Error!', error);
          res.status(500).end('Test DELETE Error!');
        });
    });
};
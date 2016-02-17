var express = require('express');
var router = express.Router();
var commentsController = require('../../controllers/commentsController');

router.get(function (req, res) {
  var params = {
    userId: req.decoded.iss,
    imageId: req.query.imageId
  };

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
      if (error.name === 'emptyResults') {
        res.status(550).end('Comments GET Error! Results Empty');
      }
      console.log('/api/comment GET Error!', error);
      res.status(500).end('Test GET Error!');
    });
});

router.post(function (req, res) {
  Promise.map(req.body, function(comment) {
    delete comment.id;
    comment.userId = req.decoded.iss;
    return comment;
  })
  .then(function (comments) {
    commentsController.createComment(comments)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        console.log('/api/comment POST Error!', error);
        res.status(500).end('Test POST Error!');
      });
  })
});

router.put(function (req, res) {
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

  commentsController.updateComment(params)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log('/api/comment PUT Error!', error);
      res.status(500).end('Test PUT Error!');
    });
});

router.delete(function (req, res) {
  var params = {
    userId: req.decoded.iss,
    imageId: req.query.imageId,
    commentId: req.query.commentId
  };

  commentsController.deleteComment(params)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log('/api/comment DELETE Error!', error);
      res.status(500).end('Test DELETE Error!');
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mousetrackingController = require('../../controllers/mousetrackingController');

router.get(function (req, res) {
  var params = {
    userId: req.decoded.iss,
    imageId: req.query.imageId
  };

  mousetrackingController.retrieveMouseTracking(params)
    .then(function (results) {
      return results.reduce(function (previous, current) {
        var params = {
          id: current.get('id'),
          data: current.get('data'),
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
      if (error.name === 'emptyResults') {
        res.status(550).end('MouseTracking GET Error! Results Empty');
      }
      console.log('/api/mousetracking GET Error!', error);
      res.status(500).end('Mousetracking GET Error!');
    });
});

router.post(function (req, res) {
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
});

router.put(function (req, res) {
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

  mousetrackingController.updateMouseTracking(params)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log('/api/mousetracking PUT Error!', error);
      res.status(500).end('Mousetracking PUT Error!');
    });
});

router.delete(function (req, res) {
  var params = {
    userId: req.decoded.iss,
    imageId: req.query.imageId,
    mouseTrackingId: req.query.mouseTrackingId
  };

  mousetrackingController.deleteMouseTracking(params)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log('/api/mousetracking DELETE Error!', error);
      res.status(500).end('Mousetracking DELETE Error!');
    });
});

module.exports = router;

var express = require('express');
var testRouter = express.Router();
var testsController = require('../../controllers/testsController');

testRouter.route('/')
  .get(function (req, res) {
    var params = {
      userId: req.decoded.iss,
      projectId: req.query.projectId
    };

    testsController.retrieveTest(params)
      .then(function (results) {
        return results.reduce(function (previous, current) {
          var params = {
            id: current.get('id'),
            projectId: current.get('projectId'),
            name: current.get('name'),
            url: current.get('url'),
            prompt: current.get('prompt')
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
          res.status(550).end('Test GET Error! Results Empty');
        }
        console.log('/api/test GET Error!', error);
        res.status(500).end('Test GET Error!');
      });
  })

  .post(function (req, res) {
    var params = {
      userId: req.decoded.iss,
      projectId: req.body.projectId,
      name: req.body.name,
      url: req.body.url,
      prompt: req.body.prompt
    };

    testsController.createTest(params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        console.log('/api/test POST Error!', error);
        res.status(500).end('Test POST Error!');
      });
  })

  .put(function (req, res) {
    var params = {
      userId: req.decoded.iss,
      testId: req.body.testId,
      projectId: req.body.projectId,
      update: {
        name: req.body.name,
        url: req.body.url,
        prompt: req.body.prompt
      }
    };

    testsController.updateTest(params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        console.log('/api/test PUT Error!', error);
        res.status(500).end('Test PUT Error!');
      });
  })

  .delete(function (req, res) {
    var params = {
      userId: req.decoded.iss,
      testId: req.query.testId,
      projectId: req.query.projectId
    };

    testsController.deleteTest(params)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (error) {
        if (error.name === 'unauthorized') {
          res.status(403).end('Test DELETE Error! Unauthorized!');
        }
        console.log('/api/test DELETE Error!', error);
        res.status(500).end('Test DELETE Error!');
      });
  });

module.exports = testRouter;

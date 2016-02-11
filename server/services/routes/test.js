var testsController = require('../../controllers/testsController');
var auth = require('../auth');

module.exports = function (app, express) {
  app.route('/api/test')
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        projectId: req.query.projectId
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   projectId: req.query.projectId
      // };

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
          console.log('/api/test GET Error!', error);
          res.status(500).end('Test GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
    // .post(function (req, res) {
      var params = {
        userId: req.decoded.iss,
        projectId: req.body.projectId,
        name: req.body.name,
        url: req.body.url,
        prompt: req.body.prompt
      };
      // var params = {
      //   userId: req.query.userId,
      //   projectId: req.query.projectId,
      //   name: req.query.name,
      //   url: req.query.url,
      //   prompt: req.query.prompt
      // };

      testsController.createTest(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test POST Error!', error);
          res.status(500).end('Test POST Error!');
        });
    })
    .put(auth.decode, function (req, res) {
    // .put(function (req, res) { /* for testing purposes */
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
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   testId: req.query.testId,
      //   projectId: req.query.projectId,
      //   update: {
      //     name: req.query.name,
      //     url: req.query.url,
      //     prompt: req.query.prompt
      //   }
      // };

      testsController.updateTest(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test PUT Error!', error);
          res.status(500).end('Test PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
    // .delete(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        testId: req.body.testId,
        projectId: req.body.projectId
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   testId: req.query.testId,
      //   projectId: req.query.projectId
      // };

      testsController.deleteTest(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test DELETE Error!', error);
          res.status(500).end('Test DELETE Error!');
        });
    });
};
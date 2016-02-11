var projectsController = require('../../controllers/projectsController');
var auth = require('../auth');

module.exports = function (app, express) {
  app.route('/api/project')
    // retrieves array of project objects
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */
      var params = { userId: req.decoded.iss };
      // var params = { userId: req.query.userId }; /* for testing purposes */

      projectsController.retrieveProject(params)
        .then(function (results) {
          return results.reduce(function (previous, current) {
            var params = {
              id: current.get('id'),
              name: current.get('name'),
              description: current.get('description')
            };

            previous.push(params);
            return previous;
          }, []);
        })
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/project GET Error!', error);
          res.status(500).end('No projects found.');
        });
    })
    .post(auth.decode, function (req, res) {
      var params = {
        userId: req.decoded.iss,
        name: req.body.name,
        description: req.body.description
      };

      projectsController.createProject(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/project POST Error!', error);
          res.status(500).end('Project already exists');
        });
    })
    .put(auth.decode, function (req, res) {
    // .put(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        projectId: req.body.projectId,
        update: {
          name: req.body.name,
          description: req.body.description
        }
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   projectId: req.query.projectId,
      //   update: {
      //     name: req.query.name,
      //     description: req.query.description
      //   }
      // };

      projectsController.updateProject(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/project PUT Error!', error);
          res.status(500).end('Project PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
    // .delete(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        projectId: req.query.projectId
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   projectId: req.query.projectId
      // };

      projectsController.deleteProject(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/project DELETE Error!', error);
          res.status(500).end('Project DELETE Error!');
        });
    });
};
var express = require('express');
var router = express.Router();
var projectsController = require('../../controllers/projectsController');

router.get(function (req, res) {
  var params = { userId: req.decoded.iss };

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
      if (error.name === 'emptyResults') {
        res.status(550).end('Project GET Error! Results Empty');
      }
      console.log('/api/project GET Error!', error);
      res.status(500).end('No projects found.');
    });
});

router.post(function (req, res) {
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
});

router.put(function (req, res) {
  var params = {
    userId: req.decoded.iss,
    projectId: req.body.projectId,
    update: {
      name: req.body.name,
      description: req.body.description
    }
  };

  projectsController.updateProject(params)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      console.log('/api/project PUT Error!', error);
      res.status(500).end('Project PUT Error!');
    });
});

router.delete(function (req, res) {
  var params = {
    userId: req.decoded.iss,
    projectId: req.query.projectId
  };

  projectsController.deleteProject(params)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (error) {
      if (error.name === 'unauthorized') {
        res.status(403).end('Project DELETE Error! Unauthorized!');
      }
      console.log('/api/project DELETE Error!', error);
      res.status(500).end('Project DELETE Error!');
    });
});

module.exports = router;
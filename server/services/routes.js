var auth = require('./auth');
var projectsController = require('../controllers/projectsController');
var testsController = require('../controllers/testsController');
var commentsController = require('../controllers/commentsController');
var imagesController = require('../controllers/imagesController');
var mousetrackingController = require('../controllers/mousetrackingController');

// inputs:
// in data field:
//    user:
//      email: the useraname
//      password: the password
// output:
// in data field:
//    message: if failure, reason for failure
module.exports = function (app, express) {
  app.post('/api/users/signin', auth.authenticate);

  app.post('/api/users/signup', auth.createUser, auth.authenticate);

  app.get('/signOut', auth.signout);

  app.route('/api/project')
    // retrieves array of project objects
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */
      var params = { userId: req.decoded.token.iss };
      // var params = req.query /* for testing purposes */

      projectsController.retrieveProject(params)
        .then(function (result) {
          res.json(result)
        })
        .catch(function (error) {
          console.log('/api/project GET Error!', error);
          res.end('No projects found.');
        });
    })
    .post(auth.decode, function (req, res) {
      var params = {
        userId: req.decoded.token.iss,
        name: req.body.name,
        description: req.body.description
      };

      projectsController.createProject(params)
        .then(function (result) {
          res.end(result);
        })
        .catch(function (error) {
          console.log('/api/project POST Error!', error);
          res.end('Project already exists');
        });
    })
    .put(auth.decode, function (req, res) {
      var params = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
      };

      projectsController.updateProject(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/project PUT Error!', error);
          res.end('Project PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
      var params = { id: req.body.id };

      projectsController.deleteProject(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/project DELETE Error!', error);
          res.end('Project DELETE Error!');
        });
    });

  app.route('/api/test')
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.token.iss,
        projectId: req.query.projectId
      };
      // var params = { user: { id: req.query.user }, project: { projectId: req.query.project } }; /* for testing purposes */

      testsController.retrieveTest(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test GET Error!', error);
          res.end('Test GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
      var params = {
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
          res.end('Test POST Error!');
        });
    })
    .put(auth.decode, function (req, res) {
      var params = {
        id: req.body.id,
        name: req.body.name,
        url: req.body.url,
        prompt: req.body.prompt
      };

      testsController.updateTest(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test PUT Error!', error);
          res.end('Test PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
      var params = { id: req.body.id };

      testController.deleteTest(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test DELETE Error!', error);
          res.end('Test DELETE Error!');
        });
    });

  app.route('/api/comment')
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.token.iss,
        imageId: req.query.imageId
      };
      // var params = { user: { id: req.query.user }, imageId: req.query.image, imageId: { id: req.query.image } }; /* for testing purposes */

      commentsController.retrieveComment(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment GET Error!', error);
          res.end('Test GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
      var params = {
        userId: req.decoded.token.iss,
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
          res.end('Test POST Error!');
        });
    })
    .put(auth.decode, function (req, res) {
      var params = {
        id: req.body.id,
        commentType: req.body.commentType,
        commentText: req.body.commentText,
        x: req.body.x,
        y: req.body.y
      };

      commentsController.updateComment(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment PUT Error!', error);
          res.end('Test PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
      var params = { id: req.body.id };

      commentsController.deleteComment(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment DELETE Error!', error);
          res.end('Test DELETE Error!');
        });
    });

  app.route('/api/image')
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.token.iss,
        testId: req.body.testId
      };
      // var params = { user: { id: req.query.user }, test: { testId: req.query.test } }; /* for testing purposes */

      imagesController.retrieveImage(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image GET Error!', error);
          res.end('Image GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
      var params = {
        userId: req.decoded.token.iss,
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
          res.end('Image POST Error!');
        });
    })
    .put(auth.decode, function (req, res) {
      var params = {
        id: req.body.id,
        testId: req.body.testId,
        image: req.body.image,
        url: req.body.url
      };

      imagesController.updateImage(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image PUT Error!', error);
          res.end('Image PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
      var params = { id: req.body.id };

      imagesController.deleteImage(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image DELETE Error!', error);
          res.end('Image DELETE Error!');
        });
    });

  app.route('/api/mousetracking')
    // .get(auth.decode, function (req, res) {
    .get(function (req, res) { /* for testing purposes */
      // var params = {
      //   userId: req.decoded.token.iss,
      //   imageId: req.query.imageId
      // };
      var params = { user: req.query.user, image: req.query.image }; /* for testing purposes */

      mousetrackingController.retrieveMouseTracking(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking GET Error!', error);
          res.end('Mousetracking GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
      var params = {
        userId: req.decoded.token.iss,
        imageId: req.body.imageId,
        movement: req.body.movement,
        clicks: req.body.clicks,
        urlchange: req.body.urlchange
      };

      mousetrackingController.retrieveMouseTracking(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking POST Error!', error);
          res.end('Mousetracking POST Error!');
        });
    })
    .put(auth.decode, function (req, res) {
      var params = {
        id: req.body.id,
        movement: req.body.movement,
        clicks: req.body.clicks,
        urlchange: req.body.urlchange
      };

      mousetrackingController.updateTracking(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking PUT Error!', error);
          res.end('Mousetracking PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
      var params = { id: req.body.id };

      mousetrackingController.deleteMouseTracking(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking DELETE Error!', error);
          res.end('Mousetracking DELETE Error!');
        });
    });
};
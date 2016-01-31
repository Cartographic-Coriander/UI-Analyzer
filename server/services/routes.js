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
  app.post('/api/users/signin', auth.authenticate, function (req, res) {
    res.writeHead(200, req.token);
    res.end();
  });

  app.post('/api/users/signup', auth.createUser, auth.authenticate, function (req, res) {
    res.writeHead(200, req.token);
    res.end();
  });

  app.get('/signOut', auth.signout);

  app.route('/api/project')
    .get(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { user_id: req.decoded };

      projectsController.retrieveProject(params)
        .then(function (result) {
          res.json(result)
        })
        .catch(function (error) {
          console.log('/api/project GET Error!', error);
          res.end('No projects found.');
        });
    })
    .post(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { user_id: req.decoded, name: req.body.name, description: req.body.description };

      projectsController.createProject(params)
        .then(function (result) {
          res.end(result);
        })
        .catch(function (error) {
          console.log('/api/project POST Error!', error);
          res.end('Project already exists');
        });
    })
    .put(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id, name: req.body.name, description: req.body.description };

      projectsController.updateProject(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/project PUT Error!', error);
          res.end('Project PUT Error!');
        });
    })
    .delete(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
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
    .get(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.decoded };

      testsController.retrieveTest(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test GET Error!', error);
          res.end('Test GET Error!');
        });
    })
    .post(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { project_id: req.body.project_id, name: req.body.name, url: req.body.url, prompt: req.body.prompt };

      testsController.createTest(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test POST Error!', error);
          res.end('Test POST Error!');
        });
    })
    .put(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id, name: req.body.name, url: req.body.url, prompt: req.body.prompt };

      testsController.updateTest(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test PUT Error!', error);
          res.end('Test PUT Error!');
        });
    })
    .delete(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id };

      testController.deleteTest(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/test DELETE Error!', error);
          res.end('Test DELETE Error!');
        });
    });

  app.route('/api/comment')
    .get(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { userId: req.decoded, testId: req.body.testId };

      testController.retrieveComment(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment GET Error!', error);
          res.end('Test GET Error!');
        });
    })
    .post(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { project_id: req.body.project_id, commentType: req.body.commentType, commentText: req.body.commentText, x: req.body.x, y: req.body.y };

      commentsController.createComment(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment POST Error!', error);
          res.end('Test POST Error!');
        });
    })
    .put(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id, commentType: req.body.commentType, commentText: req.body.commentText, x: req.body.x, y: req.body.y };

      commentsController.updateComment(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment PUT Error!', error);
          res.end('Test PUT Error!');
        });
    })
    .delete(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id };

      commentsController.deleteComment(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/comment DELETE Error!', error);
          res.end('Test DELETE Error!');
        });
    });

  app.route('/api/image')
    .get(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { test_id: req.body.test_id };

      imagesController.retrieveImage(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image GET Error!', error);
          res.end('Image GET Error!');
        });
    })
    .post(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { test_id: req.body.test_id, image: req.body.image, url: req.body.url };

      imagesController.createImage(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image POST Error!', error);
          res.end('Image POST Error!');
        });
    })
    .put(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id, test_id: req.body.test_id, image: req.body.image, url: req.body.url };

      imagesController.updateImage(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image PUT Error!', error);
          res.end('Image PUT Error!');
        });
    })
    .delete(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id };

      imagesController.deleteImage(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image DELETE Error!', error);
          res.end('Image DELETE Error!');
        });
    });

  app.route('/api/mousetracking')
    .get(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id };

      mousetrackingController.retrieveMouseTracking(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking GET Error!', error);
          res.end('Mousetracking GET Error!');
        });
    })
    .post(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { movement: req.body.movement, clicks: req.body.clicks, urlchange: req.body.urlchange };

      mousetrackingController.retrieveMouseTracking(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking POST Error!', error);
          res.end('Mousetracking POST Error!');
        });
    })
    .put(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id, movement: req.body.movement, clicks: req.body.clicks, urlchange: req.body.urlchange };

      mousetrackingController.updateTracking(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking PUT Error!', error);
          res.end('Mousetracking PUT Error!');
        });
    })
    .delete(auth.ensureLoggedIn('/signin'), auth.decode, function (req, res) {
      var params = { id: req.body.id };

      mousetrackingController.deleteMouseTracking(params)
        .then(function (params) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking DELETE Error!', error);
          res.end('Mousetracking DELETE Error!');
        });
    });
};

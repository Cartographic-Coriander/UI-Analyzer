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

  ////////////////////////////////for testing route, no database yet
  // app.post('/api/users/signin', function (req, res) {
  //   var fakeToken = 'jejejejeJEJEJEJEJjejejeje';
  //   req.token = fakeToken;//attach le token fake
  //   res.writeHead(200, req.token);
  //   res.end();
  // })
  ////////////////////////////end for testing route, no database yet
  app.post('/api/users/signin', auth.authenticate);

  app.post('/api/users/signup', auth.createUser, auth.authenticate);

  app.get('/signOut', auth.signout);

  app.route('/api/project')
    // retrieves array of project objects
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */
      var params = { id: req.decoded };
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
    .put(auth.decode, function (req, res) {
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
    // GET request input should be of the following format:
    // 
    // .get(auth.decode, function (req, res) {
    .get(function (req, res) {
      // var params = { id: req.decoded };
      // var params = { user: { id: req.query.user }, project: { projectId: req.query.project } }; 
      console.log(req.query, params)

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
    .put(auth.decode, function (req, res) {
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
    .delete(auth.decode, function (req, res) {
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
    .get(function (req, res) {
      // var params = { userId: req.decoded, testId: req.query.testId };
      var params = { userId: req.query.user, testId: req.query.test };

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
    .put(auth.decode, function (req, res) {
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
    .delete(auth.decode, function (req, res) {
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
    // ---------------------------to be removed
    // uncomment this part to see the image below show up on page reload
    // this commented part is the dummiest of dummy data
    .get( function (req, res) {
      console.log('/api/image path being hit');
      res.send('http://orig04.deviantart.net/4055/f/2015/040/b/6/rebel_symbol_wallpaper_at_1920x1080_by_chris_alvarez-d8hf47u.jpg')
    })
    // ----------------------end to be removed
    // .get(auth.decode, function (req, res) {
    .get(auth.decode, function (req, res) {
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
    .post(auth.decode, function (req, res) {
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
    .put(auth.decode, function (req, res) {
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
    .delete(auth.decode, function (req, res) {
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
    .get(auth.decode, function (req, res) {
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
    .post(auth.decode, function (req, res) {
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
    .put(auth.decode, function (req, res) {
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
    .delete(auth.decode, function (req, res) {
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
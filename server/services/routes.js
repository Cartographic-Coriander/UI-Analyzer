var auth = require('./auth');
var projectsController = require('../controllers/projectsController');
var testsController = require('../controllers/testsController');
var commentsController = require('../controllers/commentsController');
var imagesController = require('../controllers/imagesController');
var mousetrackingController = require('../controllers/mousetrackingController');
var invitationController = require('../controllers/invitationController');
var usersController = require('../controllers/usersController.js');
var Promise = require("bluebird");
var fs = require('fs');
var nodemailer = require('nodemailer');
var mailAuth = require('./mailAuth');
var port = 2999;

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
    res.json(req.userToken);
  });

  app.post('/api/users/signup', auth.createUser, auth.authenticate, function (req, res) {
    res.json(req.userToken);
  });

  app.delete('/api/users/signin', auth.signout);

  app.get('/testview', auth.decode, function (req, res) {
    port = port + 2;
    var params = {
      url: req.query.url,
      testId: req.query.testId,
      token: req.query.access_token,
      location: req.query.location,
      callbackUrl: req.query.callbackUrl,
      prompt: req.query.prompt,
      port: port
    };

    // res.setHeader('Access-Control-Allow-Origin', req.query.location + ':' + port);
    res.setHeader('Access-Control-Allow-Origin', '*');

    // new server must be spun up for every test instance
    // after a given period of inactivity the server will spin down
    require('./proxy')(express, params, function () {
      res.redirect(301, req.query.location + ':' + port + '/testview?url=' + req.query.url + '&prompt=' + req.query.prompt + '&access_token=' + params.token);
    });
  });

  app.route('/api/invitation')
    .get(auth.decode, function (req, res) {
      var params = {
        userId: req.decoded.iss,
        projectId: req.query.projectId
      };

      invitationController.retrieveAllInvitations(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/invitation GET Error!', error);
          res.status(500).end('Invitation GET Error!');
        });

    })
    .post(auth.decode, auth.encodeInvitation, function (req, res) {
      var params = {
        userId: req.decoded.iss,
        projectId: req.body.projectId,
        email: req.body.email,
        firstname: req.body.firstname,
        surname: req.body.surname,
        token: req.invitationToken
      };

      usersController.retrieveUser({ email: params.email })
        .then(function (result) {
          var params = {
            projectId: req.body.projectId,
            userId: result.id,
            role: 'tester'
          };

          invitationController.createTester(params)
            .then(function (result) {
              res.end();
            })
            .catch(function (error) {
              console.log('/api/invitation POST Error!', error);
              res.status(500).end(error);
            })
        })
        .catch(function (error) {
          var mailOptions = {
              from: 'Scrutinize App <scrutinizeApp@gmail.com>',
              to: params.email,
              subject: 'Invitation to Scrutinize App',
              text: 'Please go to:' + 'http://localhost:8000/invitation?token=' + params.token + (params.firstname ? '&firstname=' + params.firstname : '') + (params.surname ? '&surname=' + params.surname : ''),
              html: 'http://localhost:8000/invitation?token=' + params.token + (params.firstname ? '&firstname=' + params.firstname : '') + (params.surname ? '&surname=' + params.surname : '')
          };

          invitationController.createInvitation(params)
            .then(function (result) {
              var transporter = nodemailer.createTransport(mailAuth);

              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log('/api/invitation POST Error! Mail transporter error!', error);
                  res.status(500).end(error);
                }

                res.end();
              });
            })
            .catch(function (error) {
              console.log('/api/invitation POST Error!', error);
              res.status(500).end('Invitation error!');
            });
        });
    });

  app.route('/invitation')
    .get(function (req, res) {
      var params = {
        token: req.query.token,
        firstname: req.query.firstname || 'first name',
        surname:req.query.surname || 'surname'
      };

      res.render('signup', params);
    })

    .post(auth.decodeInvitation, auth.createUser, auth.authenticate, function (req, res) {
      var params = {
        userId: req.userToken.user.id,
        projectId: req.invitationToken.iss.projectId,
        role: 'tester'
      };

      invitationController.createTester(params)
        .then(function (results) {
          res.redirect(301, 'http://localhost:8000');
        })
        .catch(function (error) {
          console.log('/invitation POST Error!', error);
          res.status(500).end('Invitation sign up error!');
        });
    });

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
          if (error.name === 'emptyResults') {
            res.status(550).end('Project GET Error! Results Empty');
          }
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
          if (error.name === 'unauthorized') {
            res.status(403).end('Project DELETE Error! Unauthorized!');
          }
          console.log('/api/project DELETE Error!', error);
          res.status(500).end('Project DELETE Error!');
        });
    });

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
          if (error.name === 'emptyResults') {
            res.status(550).end('Test GET Error! Results Empty');
          }
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
        testId: req.query.testId,
        projectId: req.query.projectId
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
          if (error.name === 'unauthorized') {
            res.status(403).end('Test DELETE Error! Unauthorized!');
          }
          console.log('/api/test DELETE Error!', error);
          res.status(500).end('Test DELETE Error!');
        });
    });

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
          if (error.name === 'emptyResults') {
            res.status(550).end('Comments GET Error! Results Empty');
          }
          console.log('/api/comment GET Error!', error);
          res.status(500).end('Test GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
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
        imageId: req.query.imageId,
        commentId: req.query.commentId
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

  app.route('/api/image')
    .get(auth.decode, function (req, res) {
    // .get(function (req, res) { /* for testing purposes */

      var params = {
        userId: req.decoded.iss,
        testId: req.query.testId
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   testId: req.query.testId
      // };

      imagesController.retrieveImage(params)
        .then(function (results) {

          return Promise.reduce(results, function (previous, current) {
            var image = current.get('image').split('/');
            var buffer = fs.readFileSync(current.get('image')).toString('base64');
            var params = {
              id: current.get('id'),
              testId: current.get('testId'),
              url: current.get('url'),
              image: buffer
            };

            previous.push(params);
            return previous;
          }, []);
        })
        .then(function (result) {
          // app.use('/image', express.static(__dirname + '/../data/screenshots/' + req.testId));
          res.json(result);
        })
        .catch(function (error) {
          if (error.name === 'emptyResults') {
            res.status(550).end('Image GET Error! Results Empty');
          }
          console.log('/api/image GET Error!', error);
          res.status(500).end('Image GET Error!');
        });
    })
    .post(auth.decode, function (req, res) {
      var params = {
        userId: req.decoded.iss,
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
          res.status(500).end('Image POST Error!');
        });
    })
    .put(auth.decode, function (req, res) {
    // .put(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        imageId: req.body.imageId,
        testId: req.body.testId,
        update: {
          image: req.body.image,
          url: req.body.url
        }
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   testId: req.query.testId,
      //   update: {
      //     image: req.query.image,
      //     url: req.query.url
      //   }
      // };

      imagesController.updateImage(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image PUT Error!', error);
          res.status(500).end('Image PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
    // .delete(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        imageId: req.query.imageId,
        testId: req.query.testId,
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   testId: req.query.testId,
      // };

      imagesController.deleteImage(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/image DELETE Error!', error);
          res.status(500).end('Image DELETE Error!');
        });
    });

  app.route('/api/mousetracking')
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
      console.log('!!!!!!!!!!!mousetracking', params)

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
    })
    .post(auth.decode, function (req, res) {
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
    })
    .put(auth.decode, function (req, res) {
    // .put(function (req, res) { /* for testing purposes */
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
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   mouseTrackingId: req.query.mouseTrackingId,
      //   update: {
      //     data: req.query.data
      //   }
      // };

      mousetrackingController.updateMouseTracking(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking PUT Error!', error);
          res.status(500).end('Mousetracking PUT Error!');
        });
    })
    .delete(auth.decode, function (req, res) {
    // .delete(function (req, res) { /* for testing purposes */
      var params = {
        userId: req.decoded.iss,
        imageId: req.query.imageId,
        mouseTrackingId: req.query.mouseTrackingId
      };
      // var params = { /* for testing purposes */
      //   userId: req.query.userId,
      //   imageId: req.query.imageId,
      //   mouseTrackingId: req.query.mouseTrackingId
      // };

      mousetrackingController.deleteMouseTracking(params)
        .then(function (result) {
          res.json(result);
        })
        .catch(function (error) {
          console.log('/api/mousetracking DELETE Error!', error);
          res.status(500).end('Mousetracking DELETE Error!');
        });
    });
};

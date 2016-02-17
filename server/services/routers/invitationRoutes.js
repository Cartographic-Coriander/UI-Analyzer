var usersController = require('../../controllers/usersController');
var mailService = require('../mail');
var auth = require('../auth');

module.exports = function (app, express) {
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
            });
        })
        .catch(function (error) {
          var mailOptions = {
              from: 'Scrutinize App <scrutinizeApp@gmail.com>',
              to: params.email,
              subject: 'Invitation to Scrutinize App',
              text: 'Please go to:' + 'http://localhost:8000/invitation?token=' + params.token + (params.firstname ? '&firstname=' + params.firstname : '') + (params.surname ? '&surname=' + params.surname : ''),
              html: 'http://localhost:8000/invitation?token=' + params.token + (params.firstname ? '&firstname=' + params.firstname : '') + (params.surname ? '&surname=' + params.surname : '')
          };

          req.body.mailOptions = mailOptions;
          app.use(mailService());
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
};

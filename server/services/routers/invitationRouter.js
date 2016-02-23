var express = require('express');
var invitationRouter = express.Router();
var usersController = require('../../controllers/usersController');
var invitationController = require('../../controllers/invitationController')
var mailService = require('../mail');
var auth = require('../auth');

invitationRouter.route('/')
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
            text: 'Please go to:' + 'http://' + process.env.IP + '/invitation?token=' + params.token + (params.firstname ? '&firstname=' + params.firstname : '') + (params.surname ? '&surname=' + params.surname : ''),
            html: 'http://' + process.env.IP + '/invitation?token=' + params.token + (params.firstname ? '&firstname=' + params.firstname : '') + (params.surname ? '&surname=' + params.surname : '')
        };

        req.body.mailOptions = mailOptions;
        invitationRouter.use(mailService());
      });
  });

module.exports = invitationRouter;

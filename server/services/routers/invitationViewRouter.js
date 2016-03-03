var express = require('express');
var invitationViewRouter = express.Router();
var invitationController = require('../../controllers/invitationController')
var auth = require('../auth');

invitationViewRouter.route('/')
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
        res.redirect(301, 'http://' + process.env.IP);
      })
      .catch(function (error) {
        console.log('/invitation POST Error!', error);
        res.status(500).end('Invitation sign up error!');
      });
  });

module.exports = invitationViewRouter;
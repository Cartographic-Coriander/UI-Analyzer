var invitationController = require('../controllers/invitationController');
var nodemailer = require('nodemailer');
var mailAuth = require('./mailAuth');

module.exports = function (req, res, next) {
  var params = req.body.mailOptions;

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
};

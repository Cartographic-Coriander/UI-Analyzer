var auth = require('../auth');
var port = 2999;

module.exports = function (app, express) {
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

    res.setHeader('Access-Control-Allow-Origin', req.query.location + ':' + port);

    // new server must be spun up for every test instance
    // after a given period of inactivity the server will spin down
    require('./proxy')(express, params, function () {
      res.redirect(301, req.query.location + ':' + port + '/testview?url=' + req.query.url + '&prompt=' + req.query.prompt + '&access_token=' + params.token);
    });
  });
};
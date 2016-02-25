var express = require('express');
var testViewRouter = express.Router();
var auth = require('../auth');
var fork = require('child_process').fork;
var port = 3000;
var pool = [];

testViewRouter.route('/')
  .get(auth.decode, function (req, res) {
    port = port + 1;
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

    if (pool.length <= 8) {
      // new server must be spun up for every test instance
      // after a given period of inactivity the server will spin down
      var proxy = fork('server/services/proxy', [JSON.stringify(params), req.query.location + ':' + port + '/testview?url=' + req.query.url + '&prompt=' + req.query.prompt + '&access_token=' + params.token], { timeout: 180000, uid: port });
      pool.push(port);
      res.redirect(301, req.query.location + ':' + port + '/testview?url=' + req.query.url + '&prompt=' + req.query.prompt + '&access_token=' + params.token)
    } else {
      res.status(500).end('Proxy server overloaded! Try again later.');
    }
  })

  .post(auth.decode, function (req, res) {
    if (pool.length <= 8) {
      res.end();
    } else {
      res.status(500).end('Proxy server overloaded! Try again later.');
    }
  });

module.exports = testViewRouter;
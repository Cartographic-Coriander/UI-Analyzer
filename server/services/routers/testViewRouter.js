var express = require('express');
var testViewRouter = express.Router();
var auth = require('../auth');
var fork = require('child_process').fork;
var ports = [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007];
var pool = {};
var uid;

var childTimeout = function (uid, port, timeout) {
  setTimeout(function () {
    if (pool[uid]) {
      pool[uid].kill('SIGTERM');
      console.log('Killing child process!');
    }
  }, timeout);

  return pool[uid].on('close', function () {
    delete pool[uid];
    ports.push(port);
    console.log('Child process killed! Free ports are now:', ports);
  })
};

testViewRouter.route('/')
  .get(auth.decode, function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', req.query.location);

    if (Object.keys(pool).length <= 8) {
      var port = ports.shift();
      uid = port;
      var params = {
        url: req.query.url,
        testId: req.query.testId,
        token: req.query.access_token,
        location: req.query.location,
        callbackUrl: req.query.callbackUrl,
        prompt: req.query.prompt,
        port: port
      };

      // new server must be spun up for every test instance
      // after a given period of inactivity the server will spin down
      var child = fork('server/services/proxy', [JSON.stringify(params), req.query.location + ':' + port + '/testview?url=' + req.query.url + '&prompt=' + req.query.prompt + '&access_token=' + params.token]);
      pool[uid] = child;

      child.on('message', function (message) {
        switch (message.type) {
          case 'START':
            childTimeout(uid, port, 180000);
            res.redirect(301, req.query.location + ':' + port + '/testview?url=' + req.query.url + '&prompt=' + req.query.prompt + '&access_token=' + params.token);
          case 'DATA':
            console.log(message.data);
        }
      });
    } else {
      res.status(500).end('Proxy server overloaded! Try again later.');
    }
  })

  .post(auth.decode, function (req, res) {
    if (Object.keys(pool).length <= 8) {
      res.end();
    } else {
      res.status(500).end('Proxy server overloaded! Try again later.');
    }
  });

module.exports = testViewRouter;
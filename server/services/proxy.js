module.exports = function (express, session, callback) {
  var fs = require('fs');
  var parser = require('body-parser');
  var proxyMiddleware = require('http-proxy-middleware');
  var Pageres = require('pageres');
  var request = require('request');
  var mkdirp = require('mkdirp');
  var proxyServer = express();

  //proxy middleware
  proxyServer.use(parser.json());
  proxyServer.use(parser.urlencoded({ extended: true }));
  proxyServer.use(express.static('testview'));

  proxyServer.get('/testview', function (req, res) {
    var context = '/';
    var options = {
      target: session.url, // target host
      changeOrigin: true, // needed for virtual hosted sites
      ws: true, // proxy websockets
    };
    var proxy = proxyMiddleware(context, options);

    proxyServer.use(proxy);
    fs.readFile(__dirname + '/../../client/public/testview/testview.html', 'utf8', function (err, data) {
      if (err) {
        throw (new Error('ERROR! Read file error!', err));
      } else {
        res.send(data);
      }
    });
  });

  proxyServer.get('/realUrl', function (req, res) {
    res.send(session.url);
  });

  proxyServer.post('/screenshot', function (req, res) {
    var url = req.body.url;
    var resolution = [req.body.resolution[0] + 'x' + req.body.resolution[1]];
    var directory = __dirname + '/../data/screenshots/' + session.testId;

    mkdirp(directory, function (err) {
      new Pageres({ delay: 5 }).src(session.url, resolution, { crop: false }).dest(directory).run()
        .then(function (data) {
          res.sendStatus(201);
        });
    })

    console.log('generating screenshot for', session.url);
    console.log('resolution: ', resolution);
  });

  proxyServer.post('/endtest', function (req, res) {
    var mouseTracking = req.body.mouseTracking;
  })

  proxyServer.listen(session.port, function() {
    callback();
    console.log('Proxy server is running on' + session.location + session.port);
  });
};
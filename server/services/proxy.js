module.exports = function (express, session, callback) {
  var fs = require('fs');
  var parser = require('body-parser');
  var proxyMiddleware = require('http-proxy-middleware');
  var webshot = require('webshot');
  var mkdirp = require('mkdirp');
  var path = require('path');
  var auth = require('./auth');
  var imagesController = require('../controllers/imagesController');
  var mousetrackingController = require('../controllers/mousetrackingController');
  var proxyServer = express();
  var newServer;

  //proxy middleware
  proxyServer.use(parser.json());
  proxyServer.use(parser.urlencoded({ extended: true }));
  proxyServer.use(express.static('testview'));

  proxyServer.get('/testview', auth.decode, function (req, res) {
    var context = '/';
    var options = {
      target: session.url, // target host
      changeOrigin: true, // needed for virtual hosted sites
      ws: true, // proxy websockets
    };
    var proxy = proxyMiddleware(context, options);

    proxyServer.use(proxy);
    // fs.readFile(__dirname + '/../../client/public/testview/testview.html', 'utf8', function (err, data) {
    //   if (err) {
    //     throw (new Error('ERROR! Read file error!', err));
    //   } else {
    //     res.send(data);
    //   }
    // });
    res.sendFile(__dirname + '/../../client/public/testview/testview.html');
  });

  proxyServer.get('/api/realUrl', auth.decode, function (req, res) {
    res.send(session.url);
  });

  proxyServer.post('/api/screenshot', auth.decode, function (req, res) {
    var url = req.body.url;
    var resolution = [req.body.resolution[0] + 'x' + req.body.resolution[1]];
    var directory = __dirname + '/../data/screenshots/' + session.testId + '/';
    var dir = path.resolve(__dirname, '../data/screenshots/', session.testId) + '/';
    console.log('image save location:', dir, directory)

    var slug = function (input) {
      return input
        .replace(/^http:\/\/www/g, '')
        .replace(/^http:\/\//g, '')
        .replace(/^\s\s*/, '') // Trim start
        .replace(/\s\s*$/, '') // Trim end
        .toLowerCase() // Camel case is bad
        .replace(/[^a-z0-9_\-~!\+\s]+/g, '') // Exchange invalid chars
        .replace(/[\s]+/g, '-'); // Swap whitespace for single hyphen
    }

    mkdirp(directory, function (err) {
      if (err) {
        throw (new Error('ERROR! Directory creation error!'));
      }
    })

    var options = {
      screenSize: {
        width: req.body.resolution[0],
        height: req.body.resolution[1]
      }
    };

    webshot(url, dir + slug(url) + '.jpg', options, function(err) {
      var params = {
        testId: session.testId,
        url: url,
        image: dir + slug(url) + '.jpg'
      };
      console.log('image params:', params);

      return imagesController.createImage(params)
        .then(function (result) {
          var params = {
            userId: req.decoded.iss,
            imageId: result.get('id'),
            data: req.body.mouseTracking
          };

          return mousetrackingController.createMouseTracking(params)
            .then(function (result) {
              res.json(result.get())
            })
            .catch(function (error) {
              console.log('ERROR! Failed to save mousetracking data!', error);
              res.status(500).end('DB ERROR! Failed to create mousetracking data!');
            });
        });
    })
  });

  proxyServer.get('/api/endtest', auth.decode, function (req, res) {
    console.log('test ended', session.callbackUrl);
    res.send(session.callbackUrl);
    newServer.close();
  })

  newServer = proxyServer.listen(session.port, function() {
    callback();
    console.log('Proxy server is running on' + session.location + session.port);
  });
};
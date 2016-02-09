module.exports = function (express, session, callback) {
  var fs = require('fs');
  var parser = require('body-parser');
  var proxyMiddleware = require('http-proxy-middleware');
  var Pageres = require('pageres');
  var request = require('request');
  var mkdirp = require('mkdirp');
  var path = require('path')
  var auth = require('./auth');
  var imagesController = require('../controllers/imagesController');
  var mousetrackingController = require('../controllers/mousetrackingController');
  var proxyServer = express();

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
    fs.readFile(__dirname + '/../../client/public/testview/testview.html', 'utf8', function (err, data) {
      if (err) {
        throw (new Error('ERROR! Read file error!', err));
      } else {
        res.send(data);
      }
    });
  });

  proxyServer.get('/api/realUrl', auth.decode, function (req, res) {
    res.send(session.url);
  });

  proxyServer.post('/api/screenshot', auth.decode, function (req, res) {
    console.log('mouse tracking results: ', req.body)
    var url = req.body.url;
    var resolution = [req.body.resolution[0] + 'x' + req.body.resolution[1]];
    var directory = __dirname + '/../data/screenshots/' + session.testId;

    function slug (input) {
      return input
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

    var newImage = new Pageres({ delay: 5 }).src(url, resolution, { crop: false, filename: '<%= url %>' }).dest(directory).run()
      .then(function (data) {
        console.log('generating screenshot for', session.url);
        console.log('resolution: ', resolution);
        console.log('image data!!!!!!!!!!', data[0].filename);

        var params = {
          testId: session.testId,
          url: url,
          image: path.resolve(directory + data[0].filename)
        };

        return imagesController.createImage(params)
          .then(function (result) {
            var params = {
              userId: req.decoded.iss,
              imageId: result.get('id'),
              data: req.body.mouseTracking
            };

            return mousetrackingController.createMouseTracking(params)
              .then(function (result) {
                // console.log('mousetracking created:', result.get())
                res.json(result.get())
              })
              .catch(function (error) {
                console.log('ERROR! Failed to save mousetracking data!', error);
                res.status(500).end('DB ERROR! Failed to create mousetracking data!');
              });
          });
      })
      .catch(function (error) {
        console.log(error, 'ERROR! Image creation error, continuing....', params)
        console.log('generating screenshot for', session.url);
        console.log('resolution: ', resolution);

        var params = {
          testId: session.testId,
          url: url,
          image: path.resolve(directory + slug(url))
        };

        return imagesController.createImage(params)
          .then(function (result) {
            var params = {
              userId: req.decoded.iss,
              imageId: result.get('id'),
              data: req.body.mouseTracking
            };

            return mousetrackingController.createMouseTracking(params)
              .then(function (result) {
                // console.log('mousetracking created:', result.get())
                res.json(result.get())
              })
              .catch(function (error) {
                console.log('ERROR! Failed to save mousetracking data!', error);
                res.status(500).end('DB ERROR! Failed to create mousetracking data!');
              });
          });
      })

  }, function (req, res) {
    console.log(req.imageParams);

  });

  proxyServer.post('/endtest', auth.decode, function (req, res) {
    var mouseTracking = req.body.mouseTracking;
    console.log('test ended! data:', JSON.stringify(req.body));
    var params = {

    }
    request.post({
      uri: session.callbackUrl,
      headers: { 'x-access-token' : session.token},
      body: req.body
    })
  })

  proxyServer.listen(session.port, function() {
    callback();
    console.log('Proxy server is running on' + session.location + session.port);
  });
};
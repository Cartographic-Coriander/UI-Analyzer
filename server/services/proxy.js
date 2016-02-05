module.exports = function (express) {
  var fs = require('fs');
  var parser = require('body-parser');
  var proxyMiddleware = require('http-proxy-middleware');
  var Pageres = require('pageres');

  //TODO: GET REAL URL FROM THE CLIENT BEFORE REDIRECT ****************************************************************************************
  var proxyPort = 3000;
  var proxyServer = express();
  var path = require('path');
  var realUrl;

  //proxy middleware
  proxyServer.use(parser.json()); 
  proxyServer.use(parser.urlencoded({ extended: true }));
  proxyServer.use(express.static('testview'));

  proxyServer.get('/testview', function (req, res) {
    console.log(req.query);
    realUrl = req.query.url;
    console.log('realUrl from the query is...', realUrl);
    var context = '/'; 
    var options = {
            target: realUrl, // target host 
            changeOrigin: true,               // needed for virtual hosted sites 
            ws: true,                         // proxy websockets 
            // pathRewrite: {
            //     '^/old/api' : '/new/api'      // rewrite paths 
            // }
        };
    var proxy = proxyMiddleware(context, options);
    proxyServer.use(proxy);
    fs.readFile(path.resolve('../client/public/testview/testview.html'), "utf8", function(err, data){
      if(err) {
        throw err
      } else {
        res.send(data);
      }
    });
  });

  proxyServer.get('/realUrl', function (req, res) {
    res.send(realUrl);
  });


  proxyServer.post('/screenshot', function (req, res) {
      var url = req.body.url;
      var resolution = [req.body.resolution[0] + 'x' + req.body.resolution[1]];
      // TODO: testId should come from the client **************************************************************************
      var testId = 'test1'
      var directory = __dirname + '/screenshot/' + testId;

      if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory);
      }

      console.log('generating screenshot for', url);
      console.log('resolution: ', resolution);

      var screenshot = new Pageres({delay: 5}).src(url, resolution, {crop: false}).dest(directory).run().then(function(data){res.sendStatus(201)});
  });

  proxyServer.listen(3000, function() {
      console.log('Proxy server is running on http://localhost:' + proxyPort);
  })
}
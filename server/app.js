var express = require('express');
var app = express();
require('./db/model').init();

// configure our server with all the middleware and routing
require('./services/middleware.js')(app, express);
require('./services/routes.js')(app, express);
// require('./services/proxy.js')(express);

// start listening to requests on port 8000
app.listen(process.env.PORT || 8000);
console.log('Listening to port: 8000');

// export our app for testing and flexibility, required by index.js
module.exports = app;

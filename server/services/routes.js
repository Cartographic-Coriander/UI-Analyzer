var auth = require('./auth');
var userRouter = require('./routers/userRouter');
var testViewRouter = require('./routers/testViewRouter');
var invitationViewRouter = require('./routers/invitationViewRouter');
var invitationRouter = require('./routers/invitationRouter');
var projectRouter = require('./routers/projectRouter');
var testRouter = require('./routers/testRouter');
var commentRouter = require('./routers/commentRouter');
var imageRouter = require('./routers/imageRouter');
var mousetrackingRouter = require('./routers/mousetrackingRouter');
var path = require('path');

module.exports = function (app, express) {
  app.use('/invitation', invitationViewRouter);
  app.use('/testview', testViewRouter);
  app.use('/api/user', userRouter);
  app.use('/api/invitation', auth.decode, invitationRouter);
  app.use('/api/project', auth.decode, projectRouter);
  app.use('/api/test', auth.decode, testRouter);
  app.use('/api/comment', auth.decode, commentRouter);
  app.use('/api/image', auth.decode, imageRouter);
  app.use('/api/mousetracking', auth.decode, mousetrackingRouter);
  app.use(express.static(__dirname + '/../../client/public'));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../../client/public/', 'index.html'));
  });
};

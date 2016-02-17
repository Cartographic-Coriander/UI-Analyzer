var auth = require('./auth');
var userRoutes = require('./routers/userRoutes');
var testviewRoutes = require('./routers/testviewRoutes');
var invitationRoutes = require('./routers/invitationRoutes');
var projectRouter = require('./routers/projectRouter');
var testRouter = require('./routers/testRouter');
var commentRouter = require('./routers/commentRouter');
var imageRouter = require('./routers/imageRouter');
var mousetrackingRouter = require('./routers/mousetrackingRouter');

module.exports = function (app, express) {
  userRoutes(app, express);
  invitationRoutes(app, express);
  testviewRoutes(app, express);
  app.use('/api/project', auth.decode, projectRouter);
  app.use('/api/test', auth.decode, testRouter);
  app.use('/api/comment', auth.decode, commentRouter);
  app.use('/api/image', auth.decode, imageRouter);
  app.use('/api/mousetracking', auth.decode, mousetrackingRouter);
};

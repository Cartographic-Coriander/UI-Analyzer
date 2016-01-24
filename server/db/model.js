var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.ENV_DB || 'uiAnalyzer', 'root', 'password', { dialect: 'mysql' });

var User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: Sequelize.STRING, unique: true, notNull: true, notEmpty: true },
  password: { type: Sequelize.STRING, notNull: true, notEmpty: true },
  salt: { type: Sequelize.STRING, notNull: true, notEmpty: true },
  firstname: { type: Sequelize.STRING },
  surname: { type: Sequelize.STRING },
  company: { type: Sequelize.STRING }
}, { timestamps: false });

var Project = sequelize.define('project', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, unique: true, notNull: true, notEmpty: true },
  description: { type: Sequelize.STRING }
}, { timestamps: false });

var Test = sequelize.define('test', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, notNull: true, notEmpty: true },
  url: { type: Sequelize.STRING, notNull: true, notEmpty: true },
  prompt: { type: Sequelize.STRING, notNull: true, notEmpty: true }
}, { timestamps: false });

var Comment = sequelize.define('comment', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  commentType: { type: Sequelize.STRING, notNull: true, notEmpty: true },
  commentText: { type: Sequelize.STRING },
  x: { type: Sequelize.INTEGER },
  y: { type: Sequelize.INTEGER },
}, { timestamps: false });

var Image = sequelize.define('image', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  image: { type: Sequelize.STRING, unique: true, notNull: true, notEmpty: true },
  url: { type: Sequelize.STRING, notNull: true, notEmpty: true }
}, { timestamps: false });

var MouseTracking = sequelize.define('mousetracking', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  movement: { type: Sequelize.STRING, notNull: true, notEmpty: true },
  clicks: { type: Sequelize.STRING, notNull: true },
  urlchange: { type: Sequelize.STRING, notNull: true }
}, { timestamps: false });

var ProjectUser = sequelize.define('project_user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: Sequelize.STRING, notNull: true, notEmpty: true },
  // project_id: { type: Sequelize.INTEGER, notNull: true },
  // user_id: { type: Sequelize.INTEGER, notNull: true }
}, { timestamps: false });

var MouseTrackingTest = sequelize.define('mousetracking_test', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  mousetracking_id: { type: Sequelize.INTEGER, notNull: true }
}, { timestamps: false });

var init = function() {
  User.belongsToMany(Project, { through: 'project_user', foreignKey: 'user_id' });
  Project.belongsToMany(User, { through: 'project_user', foreignKey: 'project_id' });
  MouseTracking.belongsToMany(Test, { through: 'mousetracking_test', foreignKey: 'mousetracking_id' });
  Test.belongsToMany(MouseTracking, { through: 'mousetracking_test', foreignKey: 'user_id' });
  MouseTracking.belongsTo(User, { foreignKey: 'user_id' });
  Image.belongsTo(Test, { foreignKey: 'test_id' });
  Comment.belongsTo(User, { foreignKey: 'user_id' });
  Test.belongsTo(Project, { foreignKey: 'project_id' });
  sequelize.sync();
};

module.exports = {
  User: User,
  Project: Project,
  Test: Test,
  Comment: Comment,
  Image: Image,
  MouseTracking: MouseTracking,
  ProjectUser: ProjectUser,
  MouseTrackingTest: MouseTrackingTest,
  init: init
};
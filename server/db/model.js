var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.ENV_DB || 'uiAnalyzer', 'root', 'password', { dialect: 'mysql' });

var User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: Sequelize.STRING, isEmail: true, unique: true, notNull: true, notEmpty: true },
  password: { type: Sequelize.STRING, notNull: true, notEmpty: true },
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
  y: { type: Sequelize.INTEGER }
}, { timestamps: false });

var Image = sequelize.define('image', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  image: { type: Sequelize.STRING, notNull: true, notEmpty: true },
  url: { type: Sequelize.STRING, notNull: true, notEmpty: true, unique: 'compositeOne' },
  testId: { type: Sequelize.INTEGER, unique: 'compositeOne' }
}, { timestamps: false });

var MouseTracking = sequelize.define('mousetracking', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  data: { type: Sequelize.TEXT, notNull: true, notEmpty: true, length: 'medium' }
}, { timestamps: false });

var ProjectUser = sequelize.define('projectUser', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: Sequelize.STRING, notNull: true, notEmpty: true }
}, { timestamps: false });

var Invitation = sequelize.define('invitation', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  token: { type: Sequelize.STRING, unique: true, notNull: true },
  email: { type: Sequelize.STRING, unique: true, notNull: true }
}, { timestamps: false });

var init = function() {
  // User:Project m:m Relationship
  User.belongsToMany(Project, { through: 'projectUser', foreignKey: 'userId' });
  Project.belongsToMany(User, { through: 'projectUser', foreignKey: 'projectId' });

  // Project:Invitation 1:m Relationship
  Project.hasMany(Invitation, { foreignKey: 'projectId' });
  Invitation.belongsTo(Project, { foreignKey: 'projectId' });

  // Project:Test 1:m Relationship
  Project.hasMany(Test, { foreignKey: 'projectId' });
  Test.belongsTo(Project, { foreignKey: 'projectId' });

  // Test:Image 1:m Relationship
  Test.hasMany(Image, { foreignKey: 'testId' });
  Image.belongsTo(Test, { foreignKey: 'testId' });

  // User:Comment 1:m Relationship
  User.hasMany(Comment, { foreignKey: 'userId' });
  Comment.belongsTo(User, { foreignKey: 'userId' });

  // Image:Comment 1:m Relationship
  Image.hasMany(Comment, { foreignKey: 'imageId' });
  Comment.belongsTo(Image, { foreignKey: 'imageId' });

  // User:MouseTracking 1:m Relationship
  User.hasMany(MouseTracking, { foreignKey: 'userId' });
  MouseTracking.belongsTo(User, { foreignKey: 'userId' });

  // Image:MouseTracking 1:m Relationship
  Image.hasMany(MouseTracking, { foreignKey: 'imageId' });
  MouseTracking.belongsTo(Image, { foreignKey: 'imageId' });

  sequelize.sync();
  console.log('Database initialized!');
};

module.exports = {
  sequelize: sequelize,
  User: User,
  Project: Project,
  Test: Test,
  Comment: Comment,
  Image: Image,
  MouseTracking: MouseTracking,
  ProjectUser: ProjectUser,
  Invitation: Invitation,
  init: init
};
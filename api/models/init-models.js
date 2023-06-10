var DataTypes = require("sequelize").DataTypes;
var _pages = require("./pages");
var _styles = require("./styles");
var _users = require("./users");

function initModels(sequelize) {
  var pages = _pages(sequelize, DataTypes);
  var styles = _styles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  pages.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(pages, { as: "pages", foreignKey: "user_id"});

  return {
    pages,
    styles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

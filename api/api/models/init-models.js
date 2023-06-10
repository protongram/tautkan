var DataTypes = require("sequelize").DataTypes;
var _meme = require("./meme");

function initModels(sequelize) {
  var meme = _meme(sequelize, DataTypes);


  return {
    meme,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

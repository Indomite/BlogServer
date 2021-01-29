var DataTypes = require("sequelize").DataTypes;
var _article = require("./article");
var _comment = require("./comment");
var _likes = require("./likes");
var _roles = require("./roles");
var _tag = require("./tag");
var _user = require("./user");

function initModels(sequelize) {
  var article = _article(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    article,
    comment,
    likes,
    roles,
    tag,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('likes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "文章id"
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户id"
    },
    like_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "点赞时间"
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "状态"
    }
  }, {
    sequelize,
    tableName: 'likes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

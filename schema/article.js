const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户id"
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "标签id"
    },
    headline: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文章标题"
    },
    outline: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "文章副标题"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "创建时间"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "更新时间"
    },
    cover_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文章图片"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "文章内容"
    },
    like_times: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "点赞次数"
    },
    look_times: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "浏览次数"
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "1",
      comment: "状态"
    }
  }, {
    sequelize,
    tableName: 'article',
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

const { DataTypes } = require('sequelize');
const db = require('../config/database')
const Sequelize = db.sequelize
const Comment = require('../schema/comment')(Sequelize, DataTypes);

class CommentModel {
    //查询所有留言信息
    static async findAllCommentList(){
        return await Comment.findAll({
            // attributes: ['']
        })
    }

    //单个留言信息
    static async commentDetail(id){
        return await Comment.findOne({
            where:{
                id
            }
        })
    }

    //增加留言
    static async createComment(commentInfo){
        let {email,content,status} = commentInfo;
        await Comment.create({
            email,
            content,
            status
        })
        return true
    }

    //删除文章信息
    static async deleteComment(id){
        await Comment.destroy({
            where: {
                id,
            }
        })
        return true
    }
}

module.exports = CommentModel

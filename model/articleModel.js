const { DataTypes } = require('sequelize');
const db = require('../config/database')
const Sequelize = db.sequelize
const Article = require('../schema/article')(Sequelize, DataTypes);

class ArticleModel {
    //查询所有文章信息
    static async findAllArticleList(){
        return await Article.findAll({
            // attributes: ['']
        })
    }

    //单个用户信息
    static async articleDetail(id){
        return await Article.findOne({
            where:{
                id
            }
        })
    }

    //增加文章
    static async createArticle(articleInfo){
        let {user_id,tag_id,headline,cover_url,content,status} = articleInfo;
        await Article.create({
            user_id,
            tag_id,
            headline,
            outline,
            cover_url,
            content,
            status
        })
        return true
    }

    //更新文章信息
    static async updateArticle(id, data){
        await Article.update(data, {
            where: {
                id
            },
            fields: ['tag_id', 'headline', 'outline', 'cover_url', 'content', 'status']
        })
        return true
    }

    //删除文章信息
    static async deleteArticle(id){
        await Article.destroy({
            where: {
                id,
            }
        })
        return true
    }
}

module.exports = ArticleModel

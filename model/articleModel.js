const { DataTypes } = require('sequelize')
const db = require('../config/database')
const SequelizeDb = db.sequelize
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Article = require('../schema/article')(SequelizeDb, DataTypes)

class ArticleModel {
    //查询所有文章信息
    static async findAllArticleList(params){
        let { keyword, pageIndex, pageSize } = params
        let result = await Article.findAndCountAll({
            limit: +pageSize,
            offset: (pageIndex - 1) * (+pageSize),
            where: {
                headline: {
                    [Op.like]: '%' + keyword + '%'
                }
            }
        })
        return {
            data: result.rows,
            pageIndex: pageIndex,
            pageSize: pageSize,
            totalCount: result.count,
            totalPages: Math.ceil(result.count / pageSize)
        }
    }

    //单个文章信息
    static async articleDetail(id){
        return await Article.findOne({
            where:{
                id
            }
        })
    }

    //增加文章
    static async createArticle(params){
        let { user_id, tag_id, headline, outline, content } = params
        return await Article.create({
            user_id,
            tag_id,
            headline,
            outline,
            content
        })
    }

    //更新文章信息
    static async updateArticle(id, params){
        return await Article.update(params, {
            where: {
                id
            },
            fields: ['tag_id', 'headline', 'outline', 'cover_url', 'content', 'status']
        })
    }

    //删除文章信息
    static async deleteArticle(id){
        return await Article.destroy({
            where: {
                id
            }
        })
    }

    //点赞文章信息
    static async likeArticle(id){
        let user = await Article.findOne ({
            where: { id }
        })
        return await user.increment('like_times')
    }
}

module.exports = ArticleModel

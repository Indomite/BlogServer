const ArticleModel = require('../model/articleModel')
const { SuccessModel, ErrorModel } = require('../model/resModel')

class Article {
    //文章列表
    static async articleList(ctx){
        let params = ctx.query
        console.log(params);
        try{
            const data = await ArticleModel.findAllArticleList(params)
            ctx.body = new SuccessModel('获取文章信息成功')
            ctx.body.data = data
        } catch(err) {
            ctx.body = new ErrorModel(err)
            ctx.body.status = 500;
        }
    }

    //具体文章信息
    static async articleInfo(ctx){
        let { id } = ctx.params
        try{
            const data = await ArticleModel.articleDetail(id)
            ctx.body = new SuccessModel('查询文章成功')
            ctx.body.data = data
        } catch(err) {
            ctx.body = new ErrorModel('查询文章失败')
            ctx.body.status= 500
        }
    }

    //增加文章
    static async createArticle(ctx){
        let params = ctx.request.body
        try{
            await ArticleModel.createArticle(params)
            ctx.body = new SuccessModel('添加文章成功')
        } catch(err) {
            ctx.body = new ErrorModel('添加文章失败')
            ctx.body.status = 500
        }
    }

    //更新文章
    static async updateArticle(ctx){
        let { id } = ctx.params;
        let data = ctx.request.body;
        let params = {
            tag_id: data.tag_id,
            headline: data.headline,
            outline: data.outline,
            content: data.content
        }
        try{
            await ArticleModel.updateArticle(id,params)
            let data = await ArticleModel.articleDetail(id)
            ctx.body = new SuccessModel('更新文章成功')
            ctx.body.data = data
        } catch(err) {
            ctx.body = new ErrorModel('更新文章失败')
            ctx.body.status = 500
        }
    }

    //删除文章
    static async deleteArticle(ctx){
        let { id } = ctx.params
        try{
            await ArticleModel.deleteArticle(id)
            ctx.body = new SuccessModel('文章删除成功')
        } catch(err) {
            ctx.body = new ErrorModel(err)
            ctx.body.status = 500
        }
    }

    //点赞文章
    static async likeArticle(ctx){
        let { id } = ctx.params
        try{
            await ArticleModel.likeArticle(id)
            ctx.body = new SuccessModel('点赞成功')
        } catch(err) {
            ctx.body = new ErrorModel(err)
            ctx.body.status = 500
        }
    }

    //评论文章
    static async commentArticle(ctx){
        let { id } = ctx.params
        try{
            await ArticleModel.deleteArticle(id)
            ctx.body = new SuccessModel('文章删除成功')
        } catch(err) {
            ctx.body = new ErrorModel(err)
            ctx.body.status = 500
        }
    }
}

module.exports = Article
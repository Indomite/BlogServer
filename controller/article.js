const ArticleModel = require('../model/articleModel');

class Article {
    //文章列表
    static async articleList(ctx){
        try{
            const data = await ArticleModel.findAllArticleList();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "获取文章信息成功",
                data
            }
        } catch(err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }

    //具体文章信息
    static async articleInfo(ctx){
        let { id } = ctx.request.body;
        try{
            const data = await ArticleModel.articleDetail(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "获取成功",
                data
            }
        } catch(err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }

    //增加文章
    static async createArticle(ctx){
        let params = ctx.request.body;
        // console.log(params);
        try{
            await ArticleModel.createArticle(params);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `文章添加成功`,
                // data: token
            }
        } catch(err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }

    //更新文章
    static async updateArticle(ctx){
        let { id } = ctx.request.body;
        let data= ctx.request.body;
        let params = {
            tag_id: data.tag_id,
            headline: data.headline,
            outline: data.outline,
            cover_url: data.cover_url,
            content: data.content,
            status: data.status,
        }
        console.log(params);
        try{
            await ArticleModel.updateArticle(id,params);
            let data = await ArticleModel.articleDetail(id);
            console.log(data);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `文章更新成功`,
                data
            }
        } catch(err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }

    //删除文章
    static async deleteArticle(ctx){
        let { id } = ctx.request.body;
        // console.log(id);
        try{
            await ArticleModel.deleteArticle(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `文章删除成功`
            }
        } catch(err) {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }
}

module.exports = Article
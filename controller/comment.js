const CommentModel = require('../model/commentModel');

class Comment {
    //文章列表
    static async commentList(ctx){
        try{
            const data = await CommentModel.findAllCommentList();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "获取留言信息成功",
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
    static async commentInfo(ctx){
        let { id } = ctx.request.body;
        try{
            const data = await CommentModel.commentDetail(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "获取留言成功",
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

    //增加留言
    static async createComment(ctx){
        let params = ctx.request.body;
        // console.log(params);
        try{
            await CommentModel.createComment(params);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '留言添加成功',
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

    //删除留言
    static async deleteComment(ctx){
        let { id } = ctx.request.body;
        // console.log(id);
        try{
            await CommentModel.deleteComment(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `留言删除成功`
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

module.exports = Comment
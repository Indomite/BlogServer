const TagModel = require('../model/tagModel');

class Tag {
    //标签列表
    static async tagList(ctx){
        try{
            const data = await TagModel.findAllTagList();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "获取标签信息成功",
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

    //具体标签信息
    static async tagInfo(ctx){
        let { id } = ctx.request.body;
        try{
            const data = await TagModel.tagDetail(id);
            console.log(data);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "获取标签成功",
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

    //增加标签
    static async createTag(ctx){
        let params = ctx.request.body;
        // console.log(params);
        try{
            await TagModel.createTag(params);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `标签添加成功`,
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

    //更新标签
    static async updateTag(ctx){
        let { id } = ctx.request.body;
        let data= ctx.request.body;
        let params = {
            name: data.name,
            description: data.description,
            status: data.status,
        }
        console.log(params);
        try{
            await TagModel.updateTag(id,params);
            let data = await TagModel.tagDetail(id);
            console.log(data);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `标签更新成功`,
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

    //删除标签
    static async deleteTag(ctx){
        let { id } = ctx.request.body;
        console.log(id);
        try{
            await TagModel.deleteTag(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: `标签删除成功`
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

module.exports = Tag
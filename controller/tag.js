const TagModel = require('../model/tagModel')
const { SuccessModel, ErrorModel } = require('../model/resModel')

class Tag {
    //标签列表
    static async tagList(ctx){
        let params = ctx.request.body
        try{
            const data = await TagModel.findAllTagList(params)
            ctx.body = new SuccessModel('获取标签信息成功')
            ctx.body.data = data
        } catch(err) {
            ctx.body = new ErrorModel(err)
            ctx.body.status = 500;
        }
    }

    //增加标签
    static async create(ctx){
        let params = ctx.request.body
        // 查询标签信息
        const tagDetail = await TagModel.tagDetail(params.name);
        if(tagDetail) {
            ctx.body = new ErrorModel('标签已存在')
            ctx.body.status = 403;
            return
        }
        try{
            await TagModel.createTag(params);
            ctx.body = new SuccessModel('添加标签成功')
        } catch(err) {
            ctx.body = new ErrorModel(err)
            ctx.body.status = 500
        }
    }

    //更新标签
    static async updateTag(ctx){
        let { id } = ctx.params;
        let data = ctx.request.body;
        // 查询标签信息
        const tagDetail = await TagModel.tagDetail(data.name);
        if(tagDetail) {
            ctx.body = new ErrorModel('标签已存在')
            ctx.body.status = 403;
            return
        }
        let params = {
            name: data.name,
            description: data.description,
            status: data.status
        }
        try{
            await TagModel.updateTag(id,params)
            ctx.body = new SuccessModel('编辑标签成功')
        } catch(err) {
            ctx.body = new ErrorModel('编辑标签失败')
            ctx.body.status = 500
        }
    }
}

module.exports = Tag
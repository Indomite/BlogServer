const { DataTypes } = require('sequelize')
const db = require('../config/database')
const SequelizeDb = db.sequelize
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Tag = require('../schema/tag')(SequelizeDb, DataTypes);

class TagModel {
    //查询所有标签信息
    static async findAllTagList(params){
        let { keyword, pageIndex, pageSize } = params
        let result = await Tag.findAndCountAll({
            limit: +pageSize,
            offset: (pageIndex - 1) * (+pageSize),
            where: {
                name: {
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

    //单个标签信息
    static async tagDetail(id){
        return await Tag.findOne({
            where:{
                id
            }
        })
    }

    //增加标签
    static async createTag(params){
        let { name, description } = params
        return await Tag.create({
            name,
            description
        })
    }

    //更新标签信息
    static async updateTag(id, data){
        return await Tag.update(data, {
            where: {
                id
            },
            fields: ['name', 'description', 'status']
        })
    }
}

module.exports = TagModel

const { DataTypes } = require('sequelize');
const db = require('../config/database')
const Sequelize = db.sequelize
const Tag = require('../schema/tag')(Sequelize, DataTypes);

class TagModel {
    //查询所有标签信息
    static async findAllTagList(){
        return await Tag.findAll({
            // attributes: ['']
        })
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
    static async createTag(tagInfo){
        let {name,description,create_time,update_time,status} = tagInfo;
        await Tag.create({
            name,
            description,
            create_time,
            update_time,
            status
        })
        return true
    }

    //更新标签信息
    static async updateTag(id, data){
        await Tag.update(data, {
            where: {
                id
            },
            fields: ['name', 'description', 'status']
        })
        return true
    }

    //删除标签信息
    static async deleteTag(id){
        await Tag.destroy({
            where: {
                id,
            }
        })
        return true
    }
}

module.exports = TagModel

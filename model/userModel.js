const { DataTypes } = require('sequelize')
const db = require('../config/database')
const SequelizeDb = db.sequelize
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../schema/user')(SequelizeDb, DataTypes);

class UserModel {
    //创建用户
    static async createUser(userInfo) {
        let { username, password, email } = userInfo;
        await User.create({
            username,
            password,
            email
        })
        return true
    }

    //查询用户信息
    static async userInfo(username){
        return await User.findOne({
            where:{
                username
            }
        })
    }

    //查询所有用户信息
    static async findAllUserList(params){
        let { keyword, pageIndex, pageSize } = params
        let result = await User.findAndCountAll({
            limit: pageSize,
            offset: (pageIndex - 1) * (pageSize),
            where: {
                username: {
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
    
    //单个用户信息
    static async userDetail(id){
        return await User.findOne({
            where:{
                id
            }
        })
    }
    
    //更新用户信息
    static async updateUser(id, params){
        return await User.update(params, {
            where: {
                id
            },
            fields: ['password', 'email', 'role_id', 'status']
        })
    }
}

module.exports = UserModel
const { QueryTypes, DataTypes } = require('sequelize');
const db = require('../config/database')
const Sequelize = db.sequelize
const User = require('../schema/user')(Sequelize, DataTypes);

class UserModel {
    //创建用户
    static async create(userInfo) {
        let { username, password, email } = userInfo;
        await User.create({
            username,
            password,
            email
        })
        return true
    }

    //查询用户信息
    static async username(username){
        return await User.findOne({
            where:{
                username
            }
        })
    }

    static async delete(id){
        await User.destroy({
            where: {
                id,
            }
        })
        return true
    }

    //查询所有用户信息
    static async findAllUserList(){
        return await User.findAll({

        })
    }
}

module.exports = UserModel
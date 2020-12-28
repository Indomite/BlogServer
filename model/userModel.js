const { DataTypes } = require('sequelize');
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

    //单个用户信息
    static async userDetail(id){
        return await User.findOne({
            where:{
                id
            }
        })
    }
    
    //更新用户信息
    static async updateUsers(id, data){
        await User.update(data, {
            where: {
                id
            },
            fields: ['username', 'password', 'email', 'status']
        })
        return true
    }

    //更新单个用户信息
    static async updateUserInfo(id, data){
        await User.update(data, {
            where: {
                id
            },
            fields: ['username', 'password', 'email', 'avatar_url', 'status']
        })
        return true
    }

    //查询所有用户信息
    static async findAllUserList(){
        return await User.findAll({
            attributes: ['username','role_id','email','create_time','status']
        })
    }
}

module.exports = UserModel
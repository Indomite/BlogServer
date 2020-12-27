const jwt = require('jsonwebtoken');

const UserModel = require('../model/userModel')
const { JWT_SECRET } = require('../config/secret')

class User {
    //创建用户
    static async create(ctx){
        let { username, password, email} = ctx.request.body;
        let params = { username, password, email}
        let errors = [];

        //用户名是否存在
        const isExistUser = await UserModel.username(params.username);
        if(isExistUser){
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                message: '用户名已存在'
            }
        } else {
            try{
                await UserModel.create(params);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    message: `创建用户成功`,
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
    }
}

module.exports = User
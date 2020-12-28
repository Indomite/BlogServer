const jwt = require('jsonwebtoken');

const UserModel = require('../model/userModel')
const { genPassword } = require('../utils/crpy')
const { JWT_SECRET } = require('../config/secret');
const user = require('../schema/user');
const { param } = require('../routes/user');

class User {
    //用户注册 - 创建用户
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
                params.password = genPassword(password);
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

    //用户登录 - 校验用户
    static async login(ctx) {
        const { username, password } = ctx.request.body;
        // 查询用户信息
        const userDetail = await UserModel.username(username);
        if(!userDetail) {
            ctx.response.status = 403;
            ctx.body = {
                code: 403,
                message: "用户不存在" 
            }
            return false;
        }

        //校验密码
        if(genPassword(password) === userDetail.password){
            //用户的Token
            const userToken = {
                username: userDetail.username,
                id: userDetail.id,
                email: userDetail.email,
                avatar_url:userDetail.avatar_url
            };
            //签发token
            const token = jwt.sign(userToken,JWT_SECRET,{expiresIn:'1h'});
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '登录成功',
                data: {
                    ...userToken,
                    token: token
                }
            }
        } else {
            ctx.response.status = 401;
            ctx.response = {
                code: 401,
                message: '用户名或密码错误'
            }
        }
    }

    //编辑用户 - 修改用户信息
    static async update(ctx){
        let { id } = ctx.params;
        if(!id || isNaN(id)){
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                message: '用户ID不存在'
            }
            return false
        }

        try{
            await UserModel.update(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: "修改成功"
            }
        } catch {
            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                message: err
            }
        }
    }

    //用户列表 - 获取用户列表数据
    static async list(ctx){
        try{
            const data = await UserModel.findAllUserList();
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
}

module.exports = User
const jwt = require('jsonwebtoken');

const UserModel = require('../model/userModel')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { genPassword } = require('../utils/crpy')
const { JWT_SECRET } = require('../config/secret')

class User {
    // 用户注册
    static async create(ctx){
        let { username, password, email, code} = ctx.request.body
        if(email !== ctx.session.email) {
            ctx.body = new ErrorModel('邮箱已修改')
            return
        }
        if(code !== ctx.session.verifyCode) {
            ctx.body = new ErrorModel('验证码错误')
            return
        }

        let params = { username, password, email }
        // 判断用户名是否存在
        const isExistUser = await UserModel.userInfo(params.username)
        if(isExistUser){
            ctx.body = new ErrorModel('用户名存在')
            ctx.body.status = 403
        } else {
            try{
                params.password = genPassword(password);
                await UserModel.createUser(params);
                ctx.body = new SuccessModel('注册成功')
            } catch(err) {
                ctx.body = new ErrorModel(err)
            }
        }
    }

    //用户登录
    static async login(ctx) {
        const { username, password } = ctx.request.body;
        // 查询用户信息
        const userDetail = await UserModel.userInfo(username);
        if(!userDetail) {
            ctx.body = new ErrorModel('用户不存在')
            ctx.body.status = 403;
            return
        }

        //校验密码
        if(genPassword(password) === userDetail.password){
            //用户的Token
            const payLoad = {
                id: userDetail.id,
                username: userDetail.username,
                email: userDetail.email
            };
            //签发token
            const token = jwt.sign(payLoad, JWT_SECRET, { expiresIn:'1h' });
            ctx.body = new SuccessModel('登录成功')
            ctx.body.data = {
                //获取用户数据
                ...userDetail.dataValues,
                token: token
            }
        } else {
            ctx.body = new ErrorModel('密码错误')
            ctx.body.status = 401;
        }
    }

    //用户列表
    static async userList (ctx) {
        let params = ctx.request.body;
        console.log(params)
        try {
            const data = await UserModel.findAllUserList(params)
            ctx.body = new SuccessModel('获取用户信息成功')
            ctx.body.data = data
            return 
        } catch(err) {
            ctx.body = new ErrorModel(err)
            ctx.body.status = 500;
        }
    }

    //编辑用户
    static async usersInfoUpdate (ctx) {
        let { id } = ctx.params;
        console.log(query);
        if(!id || isNaN(id)){
            ctx.response.status = 412;
            ctx.body = {
                status: 412,
                message: '用户ID不存在'
            }
            return false
        }

        let data = ctx.request.body;
        //可被修改的属性
        let params = {
            username: data.username,
            password: genPassword(data.password),
            email: data.email,
            status: data.status,
        }
        console.log(params);
        try{
            console.log(id,params);
            await UserModel.updateUser(id,params);
            let data = await UserModel.userDetail(id);
            console.log(data);
            ctx.body = {
                code: 200,
                message: "修改成功",
                // data
            }
        } catch (err) {
            ctx.body = {
                code: 500,
                message: '编辑信息失败',
                data: err
            }
        }
    }
}

module.exports = User
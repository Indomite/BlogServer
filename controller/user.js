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
        const isExistUser = await UserModel.username(params.username)
        if(isExistUser){
            ctx.body = new ErrorModel('用户名存在')
            ctx.body.status = 403
        } else {
            try{
                params.password = genPassword(password);
                await UserModel.create(params);
                ctx.body = new SuccessModel('注册成功')
            } catch(err) {
                ctx.body = new ErrorModel(err)
            }
        }
    }

    //用户登录 - 校验用户
    static async login(ctx) {
        const { username, password } = ctx.request.body;
        // 查询用户信息
        const userDetail = await UserModel.username(username);
        if(!userDetail) {
            ctx.body = new ErrorModel('用户不存在')
            ctx.body.status = 403;
            return
        }

        //校验密码
        if(genPassword(password) === userDetail.password){
            //用户的Token
            const userToken = {
                id: userDetail.id,
                username: userDetail.username,
                email: userDetail.email
            };
            //签发token
            const token = jwt.sign(userToken, JWT_SECRET, { expiresIn:'1h' });
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

    //用户列表 - 获取用户列表数据
    static async userList(ctx){
        try{
            const data = await UserModel.findAllUserList()
            ctx.body = new SuccessModel('获取用户成功')
            ctx.body.data = data
        } catch(err) {
            ctx.body = new ErrorModel(err)
        }
    }

    //管理员编辑用户 - 修改用户信息
    static async usersInfoUpdate(ctx){
        // console.log(ctx.params);
        let { id } = ctx.params;
        // console.log(id);
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
            await UserModel.updateUsers(id,params);
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

    //编辑信息 - 修改个人信息
    static async personalInfoUpdate(ctx){
        let data = ctx.request.body;
        let params = {
            password: data.password,
            email: data.email,
            avatar_url: data.avatar_url,
            status: data.status,
        }
        try{
            await UserModel.updateUserInfo(id,params);
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
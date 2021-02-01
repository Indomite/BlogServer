const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/secret')

const util = require('util')
const verify = util.promisify(jwt.verify)
const jwtPath = require('./jwtPath')
const { ErrorModel } = require('../model/resModel')

async function checkLogin(ctx, next) {
    let method = ctx.request.method;
    console.log(method);
    if(jwtPath.find(item => item === ctx.request.url) || method === "GET")
        await next();
    else{
        try {
            const token = ctx.header.authorization
            if (token) {
                try {
                    // 解密payLoad，获取用户名和ID
                    payLoad = await verify(token.split(' ')[1], JWT_SECRET)
                    ctx.user = {
                        id: payLoad.id,
                        username: payLoad.username,
                        email: payLoad.email
                    }
                }catch (err) {
                    ctx.body = new ErrorModel('Token身份无效')
                    ctx.body.status = 401
                }
                await next();
            }
        }catch (err) {
            ctx.body = new ErrorModel(err)
        }
    }
}

module.exports = checkLogin
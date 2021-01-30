const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/secret')

const util = require('util')
const verify = util.promisify(jwt.verify)
const jwtPath = require('./jwtPath')
const { ErrorModel } = require('../model/resModel')

async function checkLogin(ctx, next) {
    if(jwtPath.find(item => item === ctx.request.url))
        await next();
    else{
        let token = ctx.header.authorization
        try {
            // 解密payLoad，获取用户名和ID
            payLoad = await verify(token, JWT_SECRET)
            console.log(payLoad)
            ctx.user = {
                username: payload.username,
                email: payload.email,
                id: payload.id
            }
        } catch (err) {
            ctx.body = new ErrorModel('Token身份无效')
            ctx.body.status = 401
        }
    }
}

module.exports = checkLogin
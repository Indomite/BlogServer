const { sendEmail } = require('../utils/sendEmail')
const { SuccessModel, ErrorModel } = require('../model/resModel')

class Email {
    static async sentCode (ctx) {
        try{
            let { email } = ctx.request.body;
            let verifyCode = Math.floor(Math.random()*999999).toString()
            await sendEmail(email, verifyCode)
            ctx.session.email = email
            ctx.session.verifyCode = verifyCode
            ctx.body = new SuccessModel(email,'发送成功')
        } catch(err) {
            ctx.body = new ErrorModel(err)
        }
    }
}

module.exports = Email
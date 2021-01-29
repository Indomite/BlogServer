const { sendEmail } = require('../utils/sendEmail')

class Email {
    static async sentCode (ctx) {
        try{
            let { email } = ctx.request.body;
            let verifyCode = Math.floor(Math.random()*999999).toString()
            await sendEmail(email, verifyCode)
            ctx.session.verifyCode = verifyCode
            ctx.body = {
                meta: {
                    msg: "发送成功",
                    status: 200
                }
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

module.exports = Email
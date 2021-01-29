const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secureConnection: false,
    auth: {
        "user": 'indomite@qq.com',
        "pass": 'mwjbxxitsyqljgfb'
    }
})

function sendEmail(email, content) {
    return transporter.sendMail({
        from: 'indomite@qq.com',
        to: email,
        subject: 'Indomite验证码',
        text:'验证码：' + content
    })
}

module.exports = {
    sendEmail
}
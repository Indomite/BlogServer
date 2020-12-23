const router = require('koa-router')()
const {
  register
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

router.prefix('/user')

router.post('/register', async (ctx, next) => {
  const body = ctx.request.body;
  // console.log(body);
  const data = await register(body);
  ctx.body = new SuccessModel(data);
})

router.post('/login', async (ctx, next) => {
  const {
    username,
    password
  } = ctx.request.body;
  const data = await login(username, password);
  if (data.username) {
    ctx.session.username = data.username;
    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

module.exports = router
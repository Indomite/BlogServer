const router = require('koa-router')()
const {
  register,
  login
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

router.post('/vertify', async (ctx, next) => {
  
})

//测试session
// router.get('/session-test', async (ctx, next) => {
//   if (ctx.session.viewCount == null) {
//     ctx.session.viewCount = 0
//   }
//   ctx.session.viewCount++

//   ctx.body = {
//     error: 0,
//     viewCount: ctx.session.viewCount
//   }
// })

module.exports = router
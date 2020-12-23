const router = require('koa-router')()

router.prefix('/user')

router.post('/register', function (ctx, next) {
  ctx.body = 'this is a regiter response!'
})

router.post('/login', function (ctx, next) {
  ctx.body = 'this is a login response!'
})

module.exports = router
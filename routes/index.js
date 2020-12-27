const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
});

router.get('/index', async (ctx, next) => {
  ctx.body = {
    message: '访问成功'
  }
})

module.exports = router
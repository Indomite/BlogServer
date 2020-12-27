const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
});

const User = require('../controller/user')

router.post('/user/register', User.create);

module.exports = router;
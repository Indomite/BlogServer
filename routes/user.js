const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
});

const User = require('../controller/user')

router.post('/user/register', User.create);
router.post('/user/login', User.login);
router.get('/user/list', User.list);

module.exports = router;
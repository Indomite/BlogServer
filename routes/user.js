const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
});

const User = require('../controller/user')

//用户注册
router.post('/user/register', User.create);
//用户登录
router.post('/user/login', User.login);
//用户列表
router.get('/user/list', User.list);
//更改用户信息
router.put('/user/update:id',User.usersInfoUpdate);
//更新用户信息
router.put('/user/InfoUpdate',User.personalInfoUpdate);

module.exports = router;
const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
});

const User = require('../controller/user')
const Article = require('../controller/article')
const Tag = require('../controller/tag')
const Email = require('../controller/email')
const Upload = require('../controller/upload')

router.get('/index', async (ctx, next) => {
  ctx.body = {
    message: '访问成功'
  }
})

//用户注册
router.post('/user', User.create);
//用户登录
router.post('/login', User.login);
//用户列表
router.get('/user', User.userList);
//具体用户列表
router.get('/user/:id', User.userInfo);
//更改用户信息
router.put('/user/:id',User.userUpdate);
//发送邮件
router.post('/email',Email.sentCode);
//上传图片
router.post('/image',Upload.uploadImage);

//获取文章列表
router.get('/article', Article.articleList);
//获取文章信息
router.get('/article/:id', Article.articleInfo);
//添加文章
router.post('/article', Article.createArticle);
//更新文章
router.put('/article/:id', Article.updateArticle);
//删除文章
router.delete('/article/:id', Article.deleteArticle);
//点赞文章
router.put('/likes/:id', Article.likeArticle);

//获取标签列表
router.get('/tag', Tag.tagList);
//具体标签信息
router.get('/tag/:id', Tag.tagInfo);
//添加标签
router.post('/tag', Tag.create);
//更新标签
router.put('/tag/:id', Tag.updateTag);

module.exports = router
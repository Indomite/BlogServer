const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
});

const Article = require('../controller/article')
const Comment = require('../controller/comment')
const Tag = require('../controller/tag')
const User = require('../controller/user')

router.get('/index', async (ctx, next) => {
  ctx.body = {
    message: '访问成功'
  }
})

//用户注册
router.post('/user/register', User.create);
//用户登录
router.post('/user/login', User.login);
//用户列表
router.get('/user', User.userList);
//更改用户信息
router.put('/user:id',User.usersInfoUpdate);
//更新用户信息
router.put('/user',User.personalInfoUpdate);

//获取文章列表
router.get('/article', Article.articleList);
//获取文章信息
router.get('/article:id', Article.articleInfo);
//添加文章
router.post('/article', Article.createArticle);
//删除文章
router.delete('/article:id', Article.deleteArticle);
//更新文章
router.put('/article:id', Article.updateArticle);

//获取留言列表
router.get('/comment', Comment.commentList);
//获取留言信息
router.get('/comment:id', Comment.commentInfo);
//添加留言
router.post('/comment', Comment.createComment);
//删除留言
router.delete('/comment:id', Comment.deleteComment);

//获取标签列表
router.get('/tag', Tag.tagList);
//获取标签信息
router.get('/tag:id', Tag.tagInfo);
//添加标签
router.post('/tag', Tag.createTag);
//删除标签
router.delete('/tag:id', Tag.deleteTag);
//更新标签
router.put('/tag:id', Tag.updateTag);

module.exports = router
const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
});

const Article = require('../controller/article')

//获取文章列表
router.get('/article/list', Article.articleList);
//获取文章信息
router.get('/article:id', Article.articleInfo);
//添加文章
router.post('/article/add', Article.createArticle);
//删除文章
router.delete('/article/delete:id', Article.deleteArticle);
//更新文章
router.put('/article/update:id', Article.updateArticle);

module.exports = router;
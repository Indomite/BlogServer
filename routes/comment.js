const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
});

const Comment = require('../controller/comment')

//获取留言列表
router.get('/comment/list', Comment.commentList);
//获取留言信息
router.get('/comment:id', Comment.commentInfo);
//添加留言
router.post('/comment/add', Comment.createComment);
//删除留言
router.delete('/comment/delete:id', Comment.deleteComment);

module.exports = router;
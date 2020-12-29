const Router = require('koa-router')
const router = new Router({
  prefix: '/api',
});

const Tag = require('../controller/tag')

//获取标签列表
router.get('/tag/list', Tag.tagList);
//获取标签信息
router.get('/tag:id', Tag.tagInfo);
//添加标签
router.post('/tag/add', Tag.createTag);
//删除标签
router.delete('/tag/delete:id', Tag.deleteTag);
//更新标签
router.put('/tag/update:id', Tag.updateTag);

module.exports = router;
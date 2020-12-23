# Blog-Back

## 数据库

### user 表（用户表）

- id：ID 号
- role_id：用户权限号
- username：用户名
- password：用户密码
- email：用户邮箱
- avatar_url：头像文件路径
- access_token：令牌验证
- status：用户状态

### roles 表（权限表）

- id：ID 号
- p_id：权限号
- name：权限名

### article 表（文章表）

- id：ID 号
- user_id：文章对应的用户 id 号
- tag_id：文章对应的标签 id 号
- headline：文章标题
- outline：文章小标题
- cover_url：页面图片地址
- content：文章内容
- like_times：被点赞次数
- look_times：浏览次数
- collection_times：收藏次数
- status：状态

### comment（评论表）

- id：id 号
- art_user_id：对应文章的用户 id
- art_comment：文章用户的内容
- com_user_id：评论用户 id
- com_comment：评论用户的内容
- status：点赞状态

### tag 表（标签表）

- id：id 号
- p_id：标签 id 号
- name：标签名
- description：标签描述

### likes（点赞表）

- id：id 号
- article_id：对应文章 id
- user_id：对应用户 id
- status：点赞状态

### collection（收藏表）

- id：id 号
- article_id：对应文章 id
- user_id：对应用户 id
- status：点赞状态

### website（网站设置表）

- id：id 号
- webtitle：网站标题
- copyright：版权信息
- ICP：备案信息
- links：网站链接

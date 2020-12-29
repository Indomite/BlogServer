# Blog-Back

## 数据库

### user 表（用户表）

- id：ID 号
- role_id：用户权限号
- username：用户名
- password：用户密码
- email：用户邮箱
- avatar_url：头像文件路径
- create_time：创建时间
- update_tim：更新时间
- status：用户状态

### roles 表（权限表）

- id：ID 号
- power：权限号
- name：权限名

### article 表（文章表）

- id：ID 号
- user_id：文章对应的用户id号
- tag_id：文章对应的标签id号
- headline：文章标题
- outline：文章小标题
- create_time：创建时间
- update_tim：更新时间
- cover_url：页面图片地址
- content：文章内容
- like_times：被点赞次数
- look_times：浏览次数
- status：状态

### comment（留言表）

- id：id 号
- email：用户邮箱
- content：留言内容
- create_time：留言创建时间
- status：点赞状态

### tag 表（标签表）

- id：id 号
- name：标签名
- description：标签描述
- create_time：创建时间
- update_tim：更新时间
- status：标签状态

### likes（点赞表）

- id：id 号
- article_id：对应文章 id
- user_id：对应用户 id
- create_time：点赞时间
- status：点赞状态

### website（网站设置表）

- id：id 号
- webtitle：网站标题
- copyright：版权信息
- ICP：备案信息
- links：网站链接
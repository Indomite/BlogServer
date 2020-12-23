const env = process.env.NODE_ENV //环境参数

let MYSQL_CONF
let REDIS_CONF

//配置开发环境和线上环境
if (env === 'dev') {
    //开发环境
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'blog'
    }
    //session数据缓存
    REDIS_CONF = {
        port: 6379,
        host: '172.0.0.1'
    }
}

if (env === 'production') {
    //线上环境
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'blog'
    }
    //session数据缓存
    REDIS_CONF = {
        port: 6379,
        host: '172.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
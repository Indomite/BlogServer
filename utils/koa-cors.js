module.exports = async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type');
    ctx.set('Content-Type', 'application/json;charset=utf-8');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Max-Age', 300);
    ctx.set('Access-Control-Expose-Headers', 'myData');
    // 解决OPTIONS请求
    if (ctx.method == 'OPTIONS') {
        ctx.body = '';
        ctx.status = 200;
    } else {
        await next();
    }
};
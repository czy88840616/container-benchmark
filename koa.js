const koa = require("koa");
const app = new koa();
const { randomString } = require('./util');

const createMiddleware = (name) => {
  return async (ctx, next) => {
    ctx.name = name;
    await next();
    if (!ctx.body) {
      ctx.body = ctx.name;
    }
  }
}

exports.createCallback = (num) => {

  for (let i = 0; i < num; i++) {
    app.use(createMiddleware(randomString(5)));
  }

  return app.callback();
};
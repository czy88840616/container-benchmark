const koa = require("koa");
const app = new koa();

const createMiddleware = (name) => {
  return async (ctx, next) => {
    ctx.name = name;
    await next();
    if (!ctx.body) {
      ctx.body = ctx.name;
    }
  }
}

app.use(createMiddleware('a'));
app.use(createMiddleware('b'));
app.use(createMiddleware('c'));

export = app;
const { MidwayContainer } = require('@midwayjs/core');
const { randomString } = require('./util');

const koa = require("koa");
const app = new koa();

const container = new MidwayContainer();

function createMiddleware(name) {

  const cls = class {
  
    resolve() {
      return async (ctx, next) => {
        ctx.name = name;
        await next();
        if (!ctx.body) {
          ctx.body = ctx.name;
        }
      };
    }
  }
  cls.name = name + 'Middleware';
  container.bind(cls);
  return container.get(cls).resolve();
}

exports.createCallback = (num) => {

  for (let i = 0; i < num; i++) {
    app.use(createMiddleware(randomString(5)));
  }

  return app.callback();
};
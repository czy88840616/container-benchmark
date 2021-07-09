const { MidwayContainer, MidwayRequestContainer, ScopeEnum } = require('@midwayjs/core');

const koa = require("koa");
const app = new koa();
const compose = require('koa-compose');
const { randomString } = require('./util');

const container = new MidwayContainer();
const targets = [];

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
  targets.push(cls);
  container.bind(cls, {
    scope: ScopeEnum.Request
  });
}


exports.createCallback = (num) => {

  for (let i = 0; i < num; i++) {
    createMiddleware(randomString(5))
  }

  app.use(async (ctx, next) => {
    ctx.requestContainer = new MidwayRequestContainer(ctx, container);
    await next();
  });
 
  app.use(async (ctx, next) => {
    const tmp = [];
    for (const target of targets) {
      tmp.push(await ctx.requestContainer.get(target).resolve());
    }

    await compose(tmp)(ctx, next);
  });

  return app.callback();
};
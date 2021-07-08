import { MidwayContainer, MidwayRequestContainer, ScopeEnum } from "@midwayjs/core";

const koa = require("koa");
const app = new koa();
const compose = require('koa-compose');

class AMiddleware {

  resolve() {
    return async (ctx, next) => {
      ctx.name = 'a';
      await next();
      if (!ctx.body) {
        ctx.body = ctx.name;
      }
    };
  }
}

class BMiddleware {

  resolve() {
    return async (ctx, next) => {
      ctx.name = 'b';
      await next();
      if (!ctx.body) {
        ctx.body = ctx.name;
      }
    };
  }
}

class CMiddleware {

  resolve() {
    return async (ctx, next) => {
      ctx.name = 'c';
      await next();
      if (!ctx.body) {
        ctx.body = ctx.name;
      }
    };
  }
}



const container = new MidwayContainer();
container.bind(AMiddleware, {
  scope: ScopeEnum.Request
});
container.bind(BMiddleware, {
  scope: ScopeEnum.Request
});
container.bind(CMiddleware, {
  scope: ScopeEnum.Request
});

app.use(async (ctx, next) => {
  ctx.requestContainer = new MidwayRequestContainer(ctx, container);
  await next();
});

app.use(async (ctx: {
  requestContainer: MidwayRequestContainer
}, next) => {
  await compose([
    await ctx.requestContainer.get<AMiddleware>(AMiddleware).resolve(),
    await ctx.requestContainer.get<BMiddleware>(BMiddleware).resolve(),
    await ctx.requestContainer.get<CMiddleware>(CMiddleware).resolve(),
  ])(ctx, next);
  await next();
});

export = app;
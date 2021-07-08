import { MidwayContainer } from "@midwayjs/core";

const koa = require("koa");
const app = new koa();

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
container.bind(AMiddleware);
container.bind(BMiddleware);
container.bind(CMiddleware);


// const createMiddleware = (name) => {
//   return async (ctx, next) => {
//     ctx.name = name;
//     await next();
//     if (!ctx.body) {
//       ctx.body = ctx.name;
//     }
//   }
// }

app.use(container.get<AMiddleware>(AMiddleware).resolve());
app.use(container.get<BMiddleware>(BMiddleware).resolve());
app.use(container.get<CMiddleware>(CMiddleware).resolve());

export = app;
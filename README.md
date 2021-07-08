# 请求作用域测试

```
➜  container-benchmark git:(master) ✗ npx ts-node index
pure koa x 354,722 ops/sec ±7.75% (73 runs sampled)
midway koa x 352,500 ops/sec ±8.47% (74 runs sampled)
midway with requestContainer x 337,942 ops/sec ±11.26% (78 runs sampled)
Fastest is pure koa,midway koa
```
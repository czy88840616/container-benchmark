var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

const count = 50;

let app = require('./koa');
const cb = app.createCallback(count);

let midwayApp = require('./midway');
const cb2 = midwayApp.createCallback(count);

let midwayRequestApp = require('./midway_request');
const cb3 = midwayRequestApp.createCallback(count);

// add tests
suite.add('pure koa', {
  defer: true,
  fn: function(defer) {
    cb({}, {
      setHeader: () => {},
      end: () => {}
    }).then((result) => {
      defer.resolve();
      // console.log(result);
    })
  }
}).add('midway koa', {
  defer: true,
  fn: function(defer) {
    cb2({}, {
      setHeader: () => {},
      end: () => {}
    }).then((result) => {
      defer.resolve();
      // console.log(result);
    })
  }
}).add('midway with requestContainer', {
  defer: true,
  fn: function(defer) {
    cb3({}, {
      setHeader: () => {},
      end: () => {}
    }).then((result) => {
      defer.resolve();
      // console.log(result);
    })
  }
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
let midwayRequestApp = require('./midway_request');
const cb3 = midwayRequestApp.createCallback(100);

(async () => {
  for (let i = 0; i < 100000; i++) {
    await cb3({}, {
      setHeader: () => {},
      end: () => {}
    });
  }
})();

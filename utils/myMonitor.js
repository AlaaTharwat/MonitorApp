const Monitor = require("ping-monitor");
//

const myMonitor = new Monitor({
  website: 'http://api.ragingflame.co.za',
  title: 'Raging Flame',
  interval: 5,

  confing: {
    intervalUnits: 'seconds' // seconds, milliseconds, minutes {default}, hours
  },

  httpOptions: {
    path: '/users',
    method: 'get',
    // query: {
    //   id: 3
    // }
  },
  expect: {
    statusCode: 200
  }
});

myMonitor.on("up", function (res, state) {
  console.log("Yay!! " + res.website + " is up.");
});

myMonitor.on("down", function (res) {
  console.log("Oh Snap!! " + res.website + " is down! " + res.statusMessage);
});

myMonitor.on("stop", function (website) {
  console.log(website + " monitor has stopped.");
});

myMonitor.on("error", function (error) {
  console.log(error);
});

exports.monitor = myMonitor;


// const myMonitor = new Monitor(
//   {
//     website: check.website,
//     title: check.title,
//     interval: check.interval,

//     confing: {
//       intervalUnits: 'minutes' // seconds, milliseconds, minutes {default}, hours
//     },

//     httpOptions: {
//       path: `/${check.path}`,
//     //   method: 'get',
//     },
//     expect: {
//       statusCode: 200
//     }
//   }
// );

// myMonitor.on("up", function (res, state) {
// console.log("Yay!! " + res.website + " is up.");
// });

// myMonitor.on("down", function (res) {
// console.log("Oh Snap!! " + res.website + " is down! " + res.statusMessage);
// });

// myMonitor.on("error", function (error) {
// console.log(error);
// });  
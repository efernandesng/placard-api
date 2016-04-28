var placard = require('placard-api');

placard.nextEvents(function (err, res) {
  if (err) return console.log(err);

  console.log(res);
});

// placard.nextEvents()
//   .then(function (res) {
//     console.log(res);
//   });

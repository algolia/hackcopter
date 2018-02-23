const pdrone = require('pdrone');
const drone = pdrone({ id: 'Team19', debug: false });
const actions = require('./actions.js');

drone.on('sensor', function({name}) {
//  console.log(name, value);
});

drone.on('connected', async function() {
  actions.init(drone);
  await actions.takeOff();
  await actions.fire();
  await actions.land();

  process.exit();
});

process.on('unhandledRejection', err => {
  console.log("Caught unhandled rejection");
  console.log(err);

  drone.safeLandingAndExit();
});

process.on('SIGINT', function() {
  console.log("Caught interrupt signal, landing if needed");

  drone.safeLandingAndExit();
});

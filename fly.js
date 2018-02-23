const pdrone = require('pdrone');
const drone = pdrone({id: 'TeamX', debug: true});

drone.on('sensor', function() {
  console.log(arguments);
});

drone.on('connected', async function() {
  drone.takeOff();
  await drone.wait(3000);
  drone.flatTrim();
  await drone.wait(1000);

  drone.fly({ yaw: 100 });
  await drone.wait(3000);
  drone.fly({ yaw: 0 });

  drone.fly({ gaz: 100 });
  await drone.wait(1000);
  drone.fly({ gaz: 0 });
  await drone.wait(1000);

  drone.openClaw();
  await drone.wait(500);

  drone.fly({ roll: -100, gaz: 100 });
  await drone.wait(500);
  drone.fly();
  await drone.wait(500);
  drone.fly({ pitch: -100 });
  await drone.wait(500);
  drone.fly();
  await drone.wait(500);
  drone.fly({ roll: 100, gaz: -100 });
  await drone.wait(500);
  drone.fly();
  await drone.wait(500);
  drone.fly({ pitch: 100 });
  await drone.wait(500);
  drone.fly();
  await drone.wait(500);

  drone.closeClaw();
  await drone.wait(500);

  drone.land();

  process.exit();
});

process.on('unhandledRejection', err => {
  console.log("Caught unhandled rejection");
  console.log(err);

  drone.safeLandingAndExit();
});

process.on('SIGINT', function() {
  console.log("Caught interrupt signal, landing");

  drone.safeLandingAndExit();
});
